use crate::bool_to_option;
use wasm_bindgen::prelude::*;
use yew::prelude::*;
use yew::virtual_dom::AttrValue;

#[wasm_bindgen(module = "/build/mwc-fab.js")]
extern "C" {
    #[derive(Debug)]
    type Fab;

    #[wasm_bindgen(getter, static_method_of = Fab)]
    fn _dummy_loader() -> JsValue;
}

loader_hack!(Fab);

/// Props for [`MatFab`]
///
/// [MWC Documentation for properties](https://github.com/material-components/material-components-web-components/tree/v0.27.0/packages/fab#propertiesattributes)
#[derive(Debug, Properties, PartialEq, Clone)]
pub struct FabProps {
    #[prop_or_default]
    pub icon: Option<AttrValue>,
    #[prop_or_default]
    pub label: Option<AttrValue>,
    #[prop_or_default]
    pub mini: bool,
    #[prop_or_default]
    pub reduced_touch_target: bool,
    #[prop_or_default]
    pub extended: bool,
    #[prop_or_default]
    pub show_icon_at_end: bool,
    #[prop_or_default]
    pub children: Children,
}

component!(
    MatFab,
    FabProps,
    |props: &FabProps| {
        html! {
             <mwc-fab
                 label={props.label.clone()}
                 icon={props.icon.clone()}
                 mini={bool_to_option(props.mini)}
                 reducedTouchTarget={bool_to_option(props.reduced_touch_target)}
                 extended={bool_to_option(props.extended)}
                 showIconAtEnd={bool_to_option(props.show_icon_at_end)}
             >{props.children.clone()}</mwc-fab>
        }
    },
    Fab,
    "fab"
);
