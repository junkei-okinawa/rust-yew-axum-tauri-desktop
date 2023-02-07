import{g as t,aj as e,h as r,ai as o,M as l,_ as n,i,c as a,B as c,y as s,p as d,q as h,d as u,f as p,m as f,e as m,ak as g}from"./core.js";import"./mwc-tab.js";var S={ANIMATING:"mdc-tab-scroller--animating",SCROLL_AREA_SCROLL:"mdc-tab-scroller__scroll-area--scroll",SCROLL_TEST:"mdc-tab-scroller__test"},T={AREA_SELECTOR:".mdc-tab-scroller__scroll-area",CONTENT_SELECTOR:".mdc-tab-scroller__scroll-content"},A=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return t(r,e),r.prototype.getScrollPositionRTL=function(){var t=this.adapter.getScrollAreaScrollLeft(),e=this.calculateScrollEdges().right;return Math.round(e-t)},r.prototype.scrollToRTL=function(t){var e=this.calculateScrollEdges(),r=this.adapter.getScrollAreaScrollLeft(),o=this.clampScrollValue(e.right-t);return{finalScrollPosition:o,scrollDelta:o-r}},r.prototype.incrementScrollRTL=function(t){var e=this.adapter.getScrollAreaScrollLeft(),r=this.clampScrollValue(e-t);return{finalScrollPosition:r,scrollDelta:r-e}},r.prototype.getAnimatingScrollPosition=function(t){return t},r.prototype.calculateScrollEdges=function(){return{left:0,right:this.adapter.getScrollContentOffsetWidth()-this.adapter.getScrollAreaOffsetWidth()}},r.prototype.clampScrollValue=function(t){var e=this.calculateScrollEdges();return Math.min(Math.max(e.left,t),e.right)},r}(e),b=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return t(r,e),r.prototype.getScrollPositionRTL=function(t){var e=this.adapter.getScrollAreaScrollLeft();return Math.round(t-e)},r.prototype.scrollToRTL=function(t){var e=this.adapter.getScrollAreaScrollLeft(),r=this.clampScrollValue(-t);return{finalScrollPosition:r,scrollDelta:r-e}},r.prototype.incrementScrollRTL=function(t){var e=this.adapter.getScrollAreaScrollLeft(),r=this.clampScrollValue(e-t);return{finalScrollPosition:r,scrollDelta:r-e}},r.prototype.getAnimatingScrollPosition=function(t,e){return t-e},r.prototype.calculateScrollEdges=function(){var t=this.adapter.getScrollContentOffsetWidth();return{left:this.adapter.getScrollAreaOffsetWidth()-t,right:0}},r.prototype.clampScrollValue=function(t){var e=this.calculateScrollEdges();return Math.max(Math.min(e.right,t),e.left)},r}(e),E=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return t(r,e),r.prototype.getScrollPositionRTL=function(t){var e=this.adapter.getScrollAreaScrollLeft();return Math.round(e-t)},r.prototype.scrollToRTL=function(t){var e=this.adapter.getScrollAreaScrollLeft(),r=this.clampScrollValue(t);return{finalScrollPosition:r,scrollDelta:e-r}},r.prototype.incrementScrollRTL=function(t){var e=this.adapter.getScrollAreaScrollLeft(),r=this.clampScrollValue(e+t);return{finalScrollPosition:r,scrollDelta:e-r}},r.prototype.getAnimatingScrollPosition=function(t,e){return t+e},r.prototype.calculateScrollEdges=function(){return{left:this.adapter.getScrollContentOffsetWidth()-this.adapter.getScrollAreaOffsetWidth(),right:0}},r.prototype.clampScrollValue=function(t){var e=this.calculateScrollEdges();return Math.min(Math.max(e.right,t),e.left)},r}(e),_=function(e){function l(t){var o=e.call(this,r(r({},l.defaultAdapter),t))||this;return o.isAnimating=!1,o}return t(l,e),Object.defineProperty(l,"cssClasses",{get:function(){return S},enumerable:!1,configurable:!0}),Object.defineProperty(l,"strings",{get:function(){return T},enumerable:!1,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{eventTargetMatchesSelector:function(){return!1},addClass:function(){},removeClass:function(){},addScrollAreaClass:function(){},setScrollAreaStyleProperty:function(){},setScrollContentStyleProperty:function(){},getScrollContentStyleValue:function(){return""},setScrollAreaScrollLeft:function(){},getScrollAreaScrollLeft:function(){return 0},getScrollContentOffsetWidth:function(){return 0},getScrollAreaOffsetWidth:function(){return 0},computeScrollAreaClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},computeScrollContentClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},computeHorizontalScrollbarHeight:function(){return 0}}},enumerable:!1,configurable:!0}),l.prototype.init=function(){var t=this.adapter.computeHorizontalScrollbarHeight();this.adapter.setScrollAreaStyleProperty("margin-bottom",-t+"px"),this.adapter.addScrollAreaClass(l.cssClasses.SCROLL_AREA_SCROLL)},l.prototype.getScrollPosition=function(){if(this.isRTL())return this.computeCurrentScrollPositionRTL();var t=this.calculateCurrentTranslateX();return this.adapter.getScrollAreaScrollLeft()-t},l.prototype.handleInteraction=function(){this.isAnimating&&this.stopScrollAnimation()},l.prototype.handleTransitionEnd=function(t){var e=t.target;this.isAnimating&&this.adapter.eventTargetMatchesSelector(e,l.strings.CONTENT_SELECTOR)&&(this.isAnimating=!1,this.adapter.removeClass(l.cssClasses.ANIMATING))},l.prototype.incrementScroll=function(t){0!==t&&this.animate(this.getIncrementScrollOperation(t))},l.prototype.incrementScrollImmediate=function(t){if(0!==t){var e=this.getIncrementScrollOperation(t);0!==e.scrollDelta&&(this.stopScrollAnimation(),this.adapter.setScrollAreaScrollLeft(e.finalScrollPosition))}},l.prototype.scrollTo=function(t){this.isRTL()?this.scrollToImplRTL(t):this.scrollToImpl(t)},l.prototype.getRTLScroller=function(){return this.rtlScrollerInstance||(this.rtlScrollerInstance=this.rtlScrollerFactory()),this.rtlScrollerInstance},l.prototype.calculateCurrentTranslateX=function(){var t=this.adapter.getScrollContentStyleValue("transform");if("none"===t)return 0;var e=/\((.+?)\)/.exec(t);if(!e)return 0;var r=e[1],l=o(r.split(","),6);l[0],l[1],l[2],l[3];var n=l[4];return l[5],parseFloat(n)},l.prototype.clampScrollValue=function(t){var e=this.calculateScrollEdges();return Math.min(Math.max(e.left,t),e.right)},l.prototype.computeCurrentScrollPositionRTL=function(){var t=this.calculateCurrentTranslateX();return this.getRTLScroller().getScrollPositionRTL(t)},l.prototype.calculateScrollEdges=function(){return{left:0,right:this.adapter.getScrollContentOffsetWidth()-this.adapter.getScrollAreaOffsetWidth()}},l.prototype.scrollToImpl=function(t){var e=this.getScrollPosition(),r=this.clampScrollValue(t),o=r-e;this.animate({finalScrollPosition:r,scrollDelta:o})},l.prototype.scrollToImplRTL=function(t){var e=this.getRTLScroller().scrollToRTL(t);this.animate(e)},l.prototype.getIncrementScrollOperation=function(t){if(this.isRTL())return this.getRTLScroller().incrementScrollRTL(t);var e=this.getScrollPosition(),r=t+e,o=this.clampScrollValue(r);return{finalScrollPosition:o,scrollDelta:o-e}},l.prototype.animate=function(t){var e=this;0!==t.scrollDelta&&(this.stopScrollAnimation(),this.adapter.setScrollAreaScrollLeft(t.finalScrollPosition),this.adapter.setScrollContentStyleProperty("transform","translateX("+t.scrollDelta+"px)"),this.adapter.computeScrollAreaClientRect(),requestAnimationFrame((function(){e.adapter.addClass(l.cssClasses.ANIMATING),e.adapter.setScrollContentStyleProperty("transform","none")})),this.isAnimating=!0)},l.prototype.stopScrollAnimation=function(){this.isAnimating=!1;var t=this.getAnimatingScrollPosition();this.adapter.removeClass(l.cssClasses.ANIMATING),this.adapter.setScrollContentStyleProperty("transform","translateX(0px)"),this.adapter.setScrollAreaScrollLeft(t)},l.prototype.getAnimatingScrollPosition=function(){var t=this.calculateCurrentTranslateX(),e=this.adapter.getScrollAreaScrollLeft();return this.isRTL()?this.getRTLScroller().getAnimatingScrollPosition(e,t):e-t},l.prototype.rtlScrollerFactory=function(){var t=this.adapter.getScrollAreaScrollLeft();this.adapter.setScrollAreaScrollLeft(t-1);var e=this.adapter.getScrollAreaScrollLeft();if(e<0)return this.adapter.setScrollAreaScrollLeft(t),new b(this.adapter);var r=this.adapter.computeScrollAreaClientRect(),o=this.adapter.computeScrollContentClientRect(),l=Math.round(o.right-r.right);return this.adapter.setScrollAreaScrollLeft(t),l===e?new E(this.adapter):new A(this.adapter)},l.prototype.isRTL=function(){return"rtl"===this.adapter.getScrollContentStyleValue("direction")},l}(l);class v extends c{constructor(){super(...arguments),this.mdcFoundationClass=_,this._scrollbarHeight=-1}_handleInteraction(){this.mdcFoundation.handleInteraction()}_handleTransitionEnd(t){this.mdcFoundation.handleTransitionEnd(t)}render(){return s`
      <div class="mdc-tab-scroller">
        <div class="mdc-tab-scroller__scroll-area"
            @wheel="${this._handleInteraction}"
            @touchstart="${this._handleInteraction}"
            @pointerdown="${this._handleInteraction}"
            @mousedown="${this._handleInteraction}"
            @keydown="${this._handleInteraction}"
            @transitionend="${this._handleTransitionEnd}">
          <div class="mdc-tab-scroller__scroll-content"><slot></slot></div>
        </div>
      </div>
      `}createAdapter(){return Object.assign(Object.assign({},d(this.mdcRoot)),{eventTargetMatchesSelector:(t,e)=>h(t,e),addScrollAreaClass:t=>this.scrollAreaElement.classList.add(t),setScrollAreaStyleProperty:(t,e)=>this.scrollAreaElement.style.setProperty(t,e),setScrollContentStyleProperty:(t,e)=>this.scrollContentElement.style.setProperty(t,e),getScrollContentStyleValue:t=>window.getComputedStyle(this.scrollContentElement).getPropertyValue(t),setScrollAreaScrollLeft:t=>this.scrollAreaElement.scrollLeft=t,getScrollAreaScrollLeft:()=>this.scrollAreaElement.scrollLeft,getScrollContentOffsetWidth:()=>this.scrollContentElement.offsetWidth,getScrollAreaOffsetWidth:()=>this.scrollAreaElement.offsetWidth,computeScrollAreaClientRect:()=>this.scrollAreaElement.getBoundingClientRect(),computeScrollContentClientRect:()=>this.scrollContentElement.getBoundingClientRect(),computeHorizontalScrollbarHeight:()=>(-1===this._scrollbarHeight&&(this.scrollAreaElement.style.overflowX="scroll",this._scrollbarHeight=this.scrollAreaElement.offsetHeight-this.scrollAreaElement.clientHeight,this.scrollAreaElement.style.overflowX=""),this._scrollbarHeight)})}getScrollPosition(){return this.mdcFoundation.getScrollPosition()}getScrollContentWidth(){return this.scrollContentElement.offsetWidth}incrementScrollPosition(t){this.mdcFoundation.incrementScroll(t)}scrollToPosition(t){this.mdcFoundation.scrollTo(t)}}n([i(".mdc-tab-scroller")],v.prototype,"mdcRoot",void 0),n([i(".mdc-tab-scroller__scroll-area")],v.prototype,"scrollAreaElement",void 0),n([i(".mdc-tab-scroller__scroll-content")],v.prototype,"scrollContentElement",void 0),n([a({passive:!0})],v.prototype,"_handleInteraction",null);const y=u`.mdc-tab-scroller{overflow-y:hidden}.mdc-tab-scroller.mdc-tab-scroller--animating .mdc-tab-scroller__scroll-content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-scroller__test{position:absolute;top:-9999px;width:100px;height:100px;overflow-x:scroll}.mdc-tab-scroller__scroll-area{-webkit-overflow-scrolling:touch;display:flex;overflow-x:hidden}.mdc-tab-scroller__scroll-area::-webkit-scrollbar,.mdc-tab-scroller__test::-webkit-scrollbar{display:none}.mdc-tab-scroller__scroll-area--scroll{overflow-x:scroll}.mdc-tab-scroller__scroll-content{position:relative;display:flex;flex:1 0 auto;transform:none;will-change:transform}.mdc-tab-scroller--align-start .mdc-tab-scroller__scroll-content{justify-content:flex-start}.mdc-tab-scroller--align-end .mdc-tab-scroller__scroll-content{justify-content:flex-end}.mdc-tab-scroller--align-center .mdc-tab-scroller__scroll-content{justify-content:center}.mdc-tab-scroller--animating .mdc-tab-scroller__scroll-area{-webkit-overflow-scrolling:auto}:host{display:flex}.mdc-tab-scroller{flex:1}`;let R=class extends v{};R.styles=[y],R=n([p("mwc-tab-scroller")],R);var I={ARROW_LEFT_KEY:"ArrowLeft",ARROW_RIGHT_KEY:"ArrowRight",END_KEY:"End",ENTER_KEY:"Enter",HOME_KEY:"Home",SPACE_KEY:"Space",TAB_ACTIVATED_EVENT:"MDCTabBar:activated",TAB_SCROLLER_SELECTOR:".mdc-tab-scroller",TAB_SELECTOR:".mdc-tab"},L={ARROW_LEFT_KEYCODE:37,ARROW_RIGHT_KEYCODE:39,END_KEYCODE:35,ENTER_KEYCODE:13,EXTRA_SCROLL_AMOUNT:20,HOME_KEYCODE:36,SPACE_KEYCODE:32},C=new Set;C.add(I.ARROW_LEFT_KEY),C.add(I.ARROW_RIGHT_KEY),C.add(I.END_KEY),C.add(I.HOME_KEY),C.add(I.ENTER_KEY),C.add(I.SPACE_KEY);var O=new Map;O.set(L.ARROW_LEFT_KEYCODE,I.ARROW_LEFT_KEY),O.set(L.ARROW_RIGHT_KEYCODE,I.ARROW_RIGHT_KEY),O.set(L.END_KEYCODE,I.END_KEY),O.set(L.HOME_KEYCODE,I.HOME_KEY),O.set(L.ENTER_KEYCODE,I.ENTER_KEY),O.set(L.SPACE_KEYCODE,I.SPACE_KEY);var x=function(e){function o(t){var l=e.call(this,r(r({},o.defaultAdapter),t))||this;return l.useAutomaticActivation=!1,l}return t(o,e),Object.defineProperty(o,"strings",{get:function(){return I},enumerable:!1,configurable:!0}),Object.defineProperty(o,"numbers",{get:function(){return L},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{scrollTo:function(){},incrementScroll:function(){},getScrollPosition:function(){return 0},getScrollContentWidth:function(){return 0},getOffsetWidth:function(){return 0},isRTL:function(){return!1},setActiveTab:function(){},activateTabAtIndex:function(){},deactivateTabAtIndex:function(){},focusTabAtIndex:function(){},getTabIndicatorClientRectAtIndex:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},getTabDimensionsAtIndex:function(){return{rootLeft:0,rootRight:0,contentLeft:0,contentRight:0}},getPreviousActiveTabIndex:function(){return-1},getFocusedTabIndex:function(){return-1},getIndexOfTabById:function(){return-1},getTabListLength:function(){return 0},notifyTabActivated:function(){}}},enumerable:!1,configurable:!0}),o.prototype.setUseAutomaticActivation=function(t){this.useAutomaticActivation=t},o.prototype.activateTab=function(t){var e,r=this.adapter.getPreviousActiveTabIndex();this.indexIsInRange(t)&&t!==r&&(-1!==r&&(this.adapter.deactivateTabAtIndex(r),e=this.adapter.getTabIndicatorClientRectAtIndex(r)),this.adapter.activateTabAtIndex(t,e),this.scrollIntoView(t),this.adapter.notifyTabActivated(t))},o.prototype.handleKeyDown=function(t){var e=this.getKeyFromEvent(t);if(void 0!==e)if(this.isActivationKey(e)||t.preventDefault(),this.useAutomaticActivation){if(this.isActivationKey(e))return;var r=this.determineTargetFromKey(this.adapter.getPreviousActiveTabIndex(),e);this.adapter.setActiveTab(r),this.scrollIntoView(r)}else{var o=this.adapter.getFocusedTabIndex();if(this.isActivationKey(e))this.adapter.setActiveTab(o);else{r=this.determineTargetFromKey(o,e);this.adapter.focusTabAtIndex(r),this.scrollIntoView(r)}}},o.prototype.handleTabInteraction=function(t){this.adapter.setActiveTab(this.adapter.getIndexOfTabById(t.detail.tabId))},o.prototype.scrollIntoView=function(t){this.indexIsInRange(t)&&(0!==t?t!==this.adapter.getTabListLength()-1?this.isRTL()?this.scrollIntoViewImplRTL(t):this.scrollIntoViewImpl(t):this.adapter.scrollTo(this.adapter.getScrollContentWidth()):this.adapter.scrollTo(0))},o.prototype.determineTargetFromKey=function(t,e){var r=this.isRTL(),o=this.adapter.getTabListLength()-1,l=t;return e===I.END_KEY?l=o:e===I.ARROW_LEFT_KEY&&!r||e===I.ARROW_RIGHT_KEY&&r?l-=1:e===I.ARROW_RIGHT_KEY&&!r||e===I.ARROW_LEFT_KEY&&r?l+=1:l=0,l<0?l=o:l>o&&(l=0),l},o.prototype.calculateScrollIncrement=function(t,e,r,o){var l=this.adapter.getTabDimensionsAtIndex(e),n=l.contentLeft-r-o,i=l.contentRight-r-L.EXTRA_SCROLL_AMOUNT,a=n+L.EXTRA_SCROLL_AMOUNT;return e<t?Math.min(i,0):Math.max(a,0)},o.prototype.calculateScrollIncrementRTL=function(t,e,r,o,l){var n=this.adapter.getTabDimensionsAtIndex(e),i=l-n.contentLeft-r,a=l-n.contentRight-r-o+L.EXTRA_SCROLL_AMOUNT,c=i-L.EXTRA_SCROLL_AMOUNT;return e>t?Math.max(a,0):Math.min(c,0)},o.prototype.findAdjacentTabIndexClosestToEdge=function(t,e,r,o){var l=e.rootLeft-r,n=e.rootRight-r-o,i=l+n;return l<0||i<0?t-1:n>0||i>0?t+1:-1},o.prototype.findAdjacentTabIndexClosestToEdgeRTL=function(t,e,r,o,l){var n=l-e.rootLeft-o-r,i=l-e.rootRight-r,a=n+i;return n>0||a>0?t+1:i<0||a<0?t-1:-1},o.prototype.getKeyFromEvent=function(t){return C.has(t.key)?t.key:O.get(t.keyCode)},o.prototype.isActivationKey=function(t){return t===I.SPACE_KEY||t===I.ENTER_KEY},o.prototype.indexIsInRange=function(t){return t>=0&&t<this.adapter.getTabListLength()},o.prototype.isRTL=function(){return this.adapter.isRTL()},o.prototype.scrollIntoViewImpl=function(t){var e=this.adapter.getScrollPosition(),r=this.adapter.getOffsetWidth(),o=this.adapter.getTabDimensionsAtIndex(t),l=this.findAdjacentTabIndexClosestToEdge(t,o,e,r);if(this.indexIsInRange(l)){var n=this.calculateScrollIncrement(t,l,e,r);this.adapter.incrementScroll(n)}},o.prototype.scrollIntoViewImplRTL=function(t){var e=this.adapter.getScrollPosition(),r=this.adapter.getOffsetWidth(),o=this.adapter.getTabDimensionsAtIndex(t),l=this.adapter.getScrollContentWidth(),n=this.findAdjacentTabIndexClosestToEdgeRTL(t,o,e,r,l);if(this.indexIsInRange(n)){var i=this.calculateScrollIncrementRTL(t,n,e,r,l);this.adapter.incrementScroll(i)}},o}(l);class P extends c{constructor(){super(...arguments),this.mdcFoundationClass=x,this.activeIndex=0,this._previousActiveIndex=-1}_handleTabInteraction(t){this.mdcFoundation.handleTabInteraction(t)}_handleKeydown(t){this.mdcFoundation.handleKeyDown(t)}render(){return s`
      <div class="mdc-tab-bar" role="tablist"
          @MDCTab:interacted="${this._handleTabInteraction}"
          @keydown="${this._handleKeydown}">
        <mwc-tab-scroller><slot></slot></mwc-tab-scroller>
      </div>
      `}_getTabs(){return this.tabsSlot.assignedNodes({flatten:!0}).filter((t=>t instanceof g))}_getTab(t){return this._getTabs()[t]}createAdapter(){return{scrollTo:t=>this.scrollerElement.scrollToPosition(t),incrementScroll:t=>this.scrollerElement.incrementScrollPosition(t),getScrollPosition:()=>this.scrollerElement.getScrollPosition(),getScrollContentWidth:()=>this.scrollerElement.getScrollContentWidth(),getOffsetWidth:()=>this.mdcRoot.offsetWidth,isRTL:()=>"rtl"===window.getComputedStyle(this.mdcRoot).getPropertyValue("direction"),setActiveTab:t=>this.mdcFoundation.activateTab(t),activateTabAtIndex:(t,e)=>{const r=this._getTab(t);void 0!==r&&r.activate(e),this._previousActiveIndex=t},deactivateTabAtIndex:t=>{const e=this._getTab(t);void 0!==e&&e.deactivate()},focusTabAtIndex:t=>{const e=this._getTab(t);void 0!==e&&e.focus()},getTabIndicatorClientRectAtIndex:t=>{const e=this._getTab(t);return void 0!==e?e.computeIndicatorClientRect():new DOMRect},getTabDimensionsAtIndex:t=>{const e=this._getTab(t);return void 0!==e?e.computeDimensions():{rootLeft:0,rootRight:0,contentLeft:0,contentRight:0}},getPreviousActiveTabIndex:()=>this._previousActiveIndex,getFocusedTabIndex:()=>{const t=this._getTabs(),e=this.getRootNode().activeElement;return t.indexOf(e)},getIndexOfTabById:t=>{const e=this._getTabs();for(let r=0;r<e.length;r++)if(e[r].id===t)return r;return-1},getTabListLength:()=>this._getTabs().length,notifyTabActivated:t=>{this.activeIndex=t,this.dispatchEvent(new CustomEvent(x.strings.TAB_ACTIVATED_EVENT,{detail:{index:t},bubbles:!0,cancelable:!0}))}}}firstUpdated(){}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.scrollerElement.updateComplete,void 0===this.mdcFoundation&&this.createFoundation(),t}scrollIndexIntoView(t){this.mdcFoundation.scrollIntoView(t)}}n([i(".mdc-tab-bar")],P.prototype,"mdcRoot",void 0),n([i("mwc-tab-scroller")],P.prototype,"scrollerElement",void 0),n([i("slot")],P.prototype,"tabsSlot",void 0),n([f((async function(){await this.updateComplete,this.activeIndex!==this._previousActiveIndex&&this.mdcFoundation.activateTab(this.activeIndex)})),m({type:Number})],P.prototype,"activeIndex",void 0);const w=u`.mdc-tab-bar{width:100%}.mdc-tab{height:48px}.mdc-tab--stacked{height:72px}:host{display:block}.mdc-tab-bar{flex:1}mwc-tab{--mdc-tab-height: 48px;--mdc-tab-stacked-height: 72px}`;let K=class extends P{};K.styles=[w],K=n([p("mwc-tab-bar")],K);export{K as TabBar};