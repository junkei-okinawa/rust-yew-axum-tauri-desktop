use crate::components::Codeblock;
use crate::with_raw_code;
use material_yew::MatCheckbox;
use yew::prelude::*;

pub struct Checkbox {}

impl Component for Checkbox {
    type Message = ();
    type Properties = ();

    fn create(_: &Context<Self>) -> Self {
        Self {}
    }

    fn view(&self, _: &Context<Self>) -> Html {
        let standard_checkbox = with_raw_code!(standard_checkbox { html! {
         <section class="demo">
             <MatCheckbox />
             <h3>{"Standard checkbox"}</h3>
         </section>
        }});

        let checked_checkbox = with_raw_code!(checked_checkbox { html! {
         <section class="demo">
             <MatCheckbox checked=true />
             <h3>{"Checked checkbox"}</h3>
         </section>
        }});

        let indeterminate_checkbox = with_raw_code!(indeterminate_checkbox { html! {
         <section class="demo">
             <MatCheckbox indeterminate=true />
             <h3>{"Indeterminate checkbox"}</h3>
         </section>
        }});

        let disabled_checkbox = with_raw_code!(disabled_checkbox { html! {
         <section class="demo">
             <MatCheckbox disabled=true />
             <h3>{"Disabled checkbox"}</h3>
         </section>
        }});

        html! {<>

            <Codeblock title="Standard" code_and_html={standard_checkbox} />

            <Codeblock title="Checked" code_and_html={checked_checkbox} />

            <Codeblock title="Indeterminate" code_and_html={indeterminate_checkbox} />

            <Codeblock title="Disabled" code_and_html={disabled_checkbox} />

        </>}
    }
}
