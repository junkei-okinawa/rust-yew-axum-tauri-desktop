use crate::components::Codeblock;
use crate::with_raw_code;
use material_yew::{
    dialog::{ActionType, MatDialogAction},
    MatButton, MatDialog, WeakComponentLink,
};
use yew::prelude::*;
use yew::virtual_dom::AttrValue;

pub struct Dialog {
    basic_dialog_link: WeakComponentLink<MatDialog>,
    action_dialog_link: WeakComponentLink<MatDialog>,
    scrollable_dialog_link: WeakComponentLink<MatDialog>,
    hide_action_dialog_link: WeakComponentLink<MatDialog>,
    stacked_dialog_link: WeakComponentLink<MatDialog>,
    hide_actions: bool,
}

pub enum Msg {
    ShowBasicDialog,
    ShowActionDialog,
    ShowScrollableDialog,
    ShowHideActionDialog,
    ShowStackedDialog,
    HideActions,
}

impl Component for Dialog {
    type Message = Msg;
    type Properties = ();

    fn create(_: &Context<Self>) -> Self {
        Self {
            basic_dialog_link: Default::default(),
            action_dialog_link: Default::default(),
            scrollable_dialog_link: Default::default(),
            hide_action_dialog_link: Default::default(),
            stacked_dialog_link: Default::default(),
            hide_actions: false,
        }
    }

    fn update(&mut self, _: &Context<Self>, msg: Self::Message) -> bool {
        match msg {
            Msg::ShowBasicDialog => {
                self.basic_dialog_link.show();
                false
            }
            Msg::ShowActionDialog => {
                self.action_dialog_link.show();
                false
            }
            Msg::ShowScrollableDialog => {
                self.scrollable_dialog_link.show();
                false
            }
            Msg::ShowHideActionDialog => {
                self.hide_action_dialog_link.show();
                false
            }
            Msg::ShowStackedDialog => {
                self.stacked_dialog_link.show();
                false
            }
            Msg::HideActions => {
                self.hide_actions = !self.hide_actions;
                true
            }
        }
    }

    fn view(&self, ctx: &Context<Self>) -> Html {
        let link = ctx.link();
        let basic = with_raw_code!(basic { html! {
         <section>
             <span onclick={link.callback(|_| Msg::ShowBasicDialog)}>
                 <MatButton raised=true label="Basic" />
             </span>
             <MatDialog heading={AttrValue::from("Dialog header")} dialog_link={self.basic_dialog_link.clone()}
                 onclosing={Callback::from(|action| gloo_console::log!(&format!("onclosing action: {}", action)))}
                 onclosed={Callback::from(|action| gloo_console::log!(&format!("closed action: {}", action)))}>
                 {"Dialog body text"}
                 <MatDialogAction action_type={ActionType::Primary} action={AttrValue::from("ok")}>
                     <MatButton label="Action 2" />
                 </MatDialogAction>
                 <MatDialogAction action_type={ActionType::Secondary} action={AttrValue::from("cancel")}>
                     <MatButton label="Action 1" />
                 </MatDialogAction>
             </MatDialog>
         </section>
        }});

        let actions = with_raw_code!(actions { html! {
         <section>
             <span onclick={link.callback(|_| Msg::ShowActionDialog)}>
                 <MatButton raised=true label="Actions" />
             </span>
             <MatDialog heading={AttrValue::from("Actions")} dialog_link={self.action_dialog_link.clone()} >
                 {"
                    By setting the dialog_action=\"my-action\" attribute on any element projected
                    into MatDialog, you can close the dialog by clicking on that element. The
                    dialog will then fire a non-bubbling \"closing\" event and a non-bubbling
                    \"closed\" event with an event detail of {action: \"my-action\"}
                "}

                 <MatDialogAction action_type={ActionType::Primary} action={AttrValue::from("customAction")}>
                     <MatButton label="This has action" />
                 </MatDialogAction>
                 <MatDialogAction action_type={ActionType::Secondary}>
                     <MatButton label="this does not" />
                 </MatDialogAction>
             </MatDialog>
         </section>
        }});

        let text = "Really long text will scroll";
        let text = text.repeat(100);

        let scrollable = with_raw_code!(scrollable { html! {
         <section>
             <span onclick={link.callback(|_| Msg::ShowScrollableDialog)}>
                 <MatButton raised=true label="Scrollable" />
             </span>
             <MatDialog heading={AttrValue::from("Scrollable")} dialog_link={self.scrollable_dialog_link.clone()}>
                 {text}
                 <MatDialogAction action_type={ActionType::Primary} action={AttrValue::from("close")}>
                     <MatButton label="Close this!" />
                 </MatDialogAction>
             </MatDialog>
         </section>
        }});

        let hide_actions = with_raw_code!(hide_actions { html! {
         <section>
             <span onclick={link.callback(|_| Msg::ShowHideActionDialog)}>
                 <MatButton raised=true label="Hide Actions" />
             </span>
             <MatDialog heading={AttrValue::from("Hide Actions")} dialog_link={self.hide_action_dialog_link.clone()} hide_action={self.hide_actions}>
                 <p>{"
                    If you don't have actions, you may want to set the \"hideActions\" property.
                    This property will remove extra whitespace at the bottom of this dialog.
                    This button will toggle that whitespace:
                "}</p>

                 <span onclick={link.callback(|_| { Msg::HideActions })}>
                     <MatButton label="Toggle hideActions" />
                 </span>
             </MatDialog>
         </section>
        }});

        let stacked = with_raw_code!(stacked { html! {
         <section>
             <span onclick={link.callback(|_| Msg::ShowStackedDialog)}>
                 <MatButton raised=true label="Stacked" />
             </span>
             <MatDialog heading={AttrValue::from("Stacked")} dialog_link={self.stacked_dialog_link.clone()} stacked=true>
                 {"
                    This is what happens when you set the stacked property on mwc-dialog.
                    Notice that the primary action is now on top.
                "}
                 <MatDialogAction action_type={ActionType::Primary} action={AttrValue::from("close")}>
                     <MatButton label="Primary" />
                 </MatDialogAction>
                 <MatDialogAction action_type={ActionType::Secondary} action={AttrValue::from("close")}>
                     <MatButton label="Secondary" />
                 </MatDialogAction>
             </MatDialog>
         </section>
        }});
        /*
         let initial_focus = with_raw_code!(initial_focus { html! {

        }});

         let form_validation = with_raw_code!(form_validation { html! {

        }});*/

        html! {
         <main>
             <Codeblock code_and_html={basic} title="Basic" />

             <Codeblock code_and_html={actions} title="Actions" />

             <Codeblock code_and_html={scrollable} title="Scrollable" />

             <Codeblock code_and_html={hide_actions} title="Hide Actions" />

             <Codeblock code_and_html={stacked} title="Stacked" />
         </main>
        }
    }
}
