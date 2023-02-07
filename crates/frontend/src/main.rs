use tauri_sys::tauri::invoke;
use yew::prelude::*;
use yew_hooks::prelude::*;

use types::UserInfo;

use material_yew::list::GraphicType;
use material_yew::*;
use material_yew::{
    text_inputs::{TextFieldType, ValidityState},
    MatTextField,
};

#[function_component(App)]
fn app() -> Html {
    // Get backend port automatically from tauri command.
    let port = use_async_with_options(
        async move {
            match invoke::<_, String>("get_port", &()).await {
                Ok(p) => Ok(p),
                Err(e) => Err(format!("Error: {:?}", e)),
            }
        },
        UseAsyncOptions::enable_auto(),
    );

    // Fetch data from backend.
    let state = {
        let port = port.clone();
        use_async(async move {
            match &port.data {
                Some(port) => {
                    let response = reqwest::get(format!("http://localhost:{}/user", port)).await;
                    match response {
                        Ok(data) => match data.json::<UserInfo>().await {
                            Ok(user) => Ok(user),
                            Err(_) => Err("Backend body Error".to_owned()),
                        },
                        Err(_) => Err("Backend request Error".to_owned()),
                    }
                }
                _ => Err("Backend is unavailable".to_owned()),
            }
        })
    };

    let onclick = {
        let state = state.clone();
        Callback::from(move |_| {
            state.run();
        })
    };

    // Fetch data from server.
    let state_server = use_async(async move {
        let response = reqwest::get("http://localhost:3001/user").await;
        match response {
            Ok(data) => match data.json::<UserInfo>().await {
                Ok(user) => Ok(user),
                Err(_) => Err("Body Error".to_string()),
            },
            Err(_) => Err("Request Error".to_string()),
        }
    });

    let onclickserver = {
        let state_server = state_server.clone();
        Callback::from(move |_| {
            state_server.run();
        })
    };

    let history = use_list(vec![]);

    // Manually connect to websocket with custom options.
    let ws = {
        let history = history.clone();
        let port = port.data.clone().unwrap_or_default();
        use_websocket_with_options(
            format!("ws://localhost:{}/ws", port),
            UseWebSocketOptions {
                // Receive message by callback `onmessage`.
                onmessage: Some(Box::new(move |message| {
                    history.push(format!("ws [recv]: {}", message));
                })),
                manual: Some(true),
                ..Default::default()
            },
        )
    };
    let onclick2 = {
        let ws = ws.clone();
        let history = history.clone();
        Callback::from(move |_| {
            let message = "Hello, backend!".to_string();
            ws.send(message.clone());
            history.push(format!("ws [send]: {}", message));
        })
    };
    let onopen = {
        let ws = ws.clone();
        Callback::from(move |_| {
            ws.open();
        })
    };

    let validity_transform = MatTextField::validity_transform(move |_, _| {
        let mut state = ValidityState::new();
        state.set_valid(false).set_bad_input(true);
        state
    });
    html! {
    <>
        <section class="demo">
            <div class="demo-group-spaced">
                <MatTextField label="Standard (always fails validity check)" validity_transform={validity_transform.clone()} />
                <MatTextField label="Standard" icon="event" field_type={TextFieldType::Date} />
                <MatTextField label="Standard" icon_trailing="delete" />
            </div>
        </section>
        <hr />
        <section class="demo">
            <div class="demo-group-spaced">
                <MatTextField label="Standard" helper="Helper Text" helper_persistent=true max_length=18 char_counter=true />
                <MatTextField outlined=true label="Standard" helper="Helper Text" helper_persistent=true max_length=18 char_counter=true />
                <span class="shaped-outlined">
                    <MatTextField outlined=true label="Standard" helper="Helper Text" helper_persistent=true max_length=18 char_counter=true />
                </span>
            </div>
        </section>
        <hr />
        <section>
            <MatSelect label="Has Icon" outlined=true icon="event">
                <MatListItem>{""}</MatListItem>
                <MatListItem value="0" graphic={GraphicType::Icon}>{"Option 0"}</MatListItem>
                <MatListItem value="1" graphic={GraphicType::Icon}>{"Option 1"}</MatListItem>
                <MatListItem value="2" graphic={GraphicType::Icon}>{"Option 2"}</MatListItem>
                <MatListItem value="3" graphic={GraphicType::Icon}>{"Option 3"}</MatListItem>
            </MatSelect>
        </section>
        <hr />
        <section class="demo">
            <MatButton label="Click me!" raised=true/>
            <MatButton label="Click me!" icon={AttrValue::from("code")} raised=true/>
        </section>
        <section class="demo">
            <h3>{"Switch"}</h3>
            <MatSwitch />
        </section>
        <section class="demo">
            <MatRadio name="some name" />
        </section>
        <section class="demo">
            <MatFab icon="edit" />
        </section>
        <MatCircularProgress indeterminate=true />
        <section>
            <div style="margin: 1em;">
                <MatLinearProgress indeterminate=true />
            </div>
        </section>
        <section class="demo">
            <MatSlider />
        </section>
        <section class="demo">
            <MatIcon>{"sentiment_very_dissatisfied"}</MatIcon>
            <MatIcon>{"sentiment_dissatisfied"}</MatIcon>
            <MatIcon>{"sentiment_very_dissatisfied"}</MatIcon>
            <MatIcon>{"sentiment_very_dissatisfied"}</MatIcon>
            <MatIcon>{"sentiment_very_dissatisfied"}</MatIcon>
        </section>
        <section>
            <div class="demo">
                <h3>{"Standard"}</h3>
                <MatFormfield label="This is a checkbox">
                    <MatCheckbox />
                </MatFormfield>
            </div>

            <div class="demo">
                <h3>{"Align End"}</h3>
                <MatFormfield label="This is another checkbox" align_end=true>
                    <MatCheckbox />
                </MatFormfield>
            </div>
        </section>
            <p>
                <button {onclick}>{ "Load backend api" }</button>
                <button onclick={onclickserver}>{ "Load server api" }</button>
            </p>
            {
                if let Some(response) = &state.data {
                    html! {
                        <p>{ "From backend: " }<b>{ &response.name }</b></p>
                    }
                } else {
                    html! {}
                }
            }
            {
                if let Some(response) = &state_server.data {
                    html! {
                        <p>{ "From server: " }<b>{ &response.name }</b></p>
                    }
                } else {
                    html! {}
                }
            }
            <p>
                <button onclick={onopen} disabled={*ws.ready_state != UseWebSocketReadyState::Closed}>{ "Connect to backend websocket" }</button>
                <button onclick={onclick2} disabled={*ws.ready_state != UseWebSocketReadyState::Open}>{ "Send to backend websocket" }</button>
            </p>
            {
                for history.current().iter().map(|message| {
                    html! {
                        <p>{ message }</p>
                    }
                })
            }
        </>
    }
}

fn main() {
    wasm_logger::init(wasm_logger::Config::default());
    yew::Renderer::<App>::new().render();
}
