
/*AngularJS v1.5.6(c) 2010-2016 Google, Inc. http://angularjs.orgLicense: MIT*/
(function(n,e){'use strict';function B(a){var c=[];w(c,e.noop).chars(a);return c.join("")}function h(a,c){var b={},d=a.split(","),l;for(l=0;l<d.length;l++)b[c?e.lowercase(d[l]):d[l]]=!0;return b}function C(a,c){null===a||void 0===a?a="":"string"!==typeof a&&(a=""+a);g.innerHTML=a;var b=5;do{if(0===b)throw x("uinput");b--;n.document.documentMode&&t(g);a=g.innerHTML;g.innerHTML=a}while(a!==g.innerHTML);for(b=g.firstChild;b;){switch(b.nodeType){case 1:c.start(b.nodeName.toLowerCase(),D(b.attributes));
break;case 3:c.chars(b.textContent)}var d;if(!(d=b.firstChild)&&(1==b.nodeType&&c.end(b.nodeName.toLowerCase()),d=b.nextSibling,!d))for(;null==d;){b=b.parentNode;if(b===g)break;d=b.nextSibling;1==b.nodeType&&c.end(b.nodeName.toLowerCase())}b=d}for(;b=g.firstChild;)g.removeChild(b)}function D(a){for(var c={},b=0,d=a.length;b<d;b++){var l=a[b];c[l.name]=l.value}return c}function y(a){return a.replace(/&/g,"&amp;").replace(E,function(a){var b=a.charCodeAt(0);a=a.charCodeAt(1);return"&#"+(1024*(b-55296)+
(a-56320)+65536)+";"}).replace(F,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function w(a,c){var b=!1,d=e.bind(a,a.push);return{start:function(a,f){a=e.lowercase(a);!b&&G[a]&&(b=a);b||!0!==u[a]||(d("<"),d(a),e.forEach(f,function(b,f){var g=e.lowercase(f),h="img"===a&&"src"===g||"background"===g;!0!==H[g]||!0===z[g]&&!c(b,h)||(d(" "),d(f),d('="'),d(y(b)),d('"'))}),d(">"))},end:function(a){a=e.lowercase(a);b||!0!==u[a]||!0===A[a]||(d("</"),d(a),d(">"));a==
b&&(b=!1)},chars:function(a){b||d(y(a))}}}function t(a){if(a.nodeType===n.Node.ELEMENT_NODE)for(var c=a.attributes,b=0,d=c.length;b<d;b++){var e=c[b],f=e.name.toLowerCase();if("xmlns:ns1"===f||0===f.lastIndexOf("ns1:",0))a.removeAttributeNode(e),b--,d--}(c=a.firstChild)&&t(c);(c=a.nextSibling)&&t(c)}var x=e.$$minErr("$sanitize"),E=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,F=/([^\#-~ |!])/g,A=h("area,br,col,hr,img,wbr"),q=h("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),k=h("rp,rt"),v=e.extend({},k,q),
q=e.extend({},q,h("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul")),k=e.extend({},k,h("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),I=h("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan"),
G=h("script,style"),u=e.extend({},A,q,k,v),z=h("background,cite,href,longdesc,src,xlink:href"),v=h("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),k=h("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan",
!0),H=e.extend({},z,k,v),g;(function(a){if(a.document&&a.document.implementation)a=a.document.implementation.createHTMLDocument("inert");else throw x("noinert");var c=(a.documentElement||a.getDocumentElement()).getElementsByTagName("body");1===c.length?g=c[0]:(c=a.createElement("html"),g=a.createElement("body"),c.appendChild(g),a.appendChild(c))})(n);e.module("ngSanitize",[]).provider("$sanitize",function(){var a=!1;this.$get=["$$sanitizeUri",function(c){a&&e.extend(u,I);return function(a){var d=
[];C(a,w(d,function(a,b){return!/^unsafe:/.test(c(a,b))}));return d.join("")}}];this.enableSvg=function(c){return e.isDefined(c)?(a=c,this):a}});e.module("ngSanitize").filter("linky",["$sanitize",function(a){var c=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,b=/^mailto:/i,d=e.$$minErr("linky"),g=e.isString;return function(f,h,m){function k(a){a&&p.push(B(a))}function q(a,b){var c;p.push("<a ");e.isFunction(m)&&(m=m(a));if(e.isObject(m))for(c in m)p.push(c+
'="'+m[c]+'" ');else m={};!e.isDefined(h)||"target"in m||p.push('target="',h,'" ');p.push('href="',a.replace(/"/g,"&quot;"),'">');k(b);p.push("</a>")}if(null==f||""===f)return f;if(!g(f))throw d("notstring",f);for(var r=f,p=[],s,n;f=r.match(c);)s=f[0],f[2]||f[4]||(s=(f[3]?"http://":"mailto:")+s),n=f.index,k(r.substr(0,n)),q(s,f[0].replace(b,"")),r=r.substring(n+f[0].length);k(r);return a(p.join(""))}}])})(window,window.angular);
;;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());

/**
 * @module mobile-angular-ui.core.activeLinks
 * @description
 *
 * `mobile-angular-ui.activeLinks` module sets up `.active` class for `a`
 * elements those `href` attribute matches the current angular `$location` url.
 * It takes care of excluding both search part and hash part from comparison.
 *
 * `.active` classes are added/removed each time one of `$locationChangeSuccess`
 * or `$includeContentLoaded` is fired.
 *
 * ## Usage
 *
 * Just declare it as a dependency to your app unless you have already included
 * one of its super-modules.
 *
 * ```
 * angular.module('myApp', ['mobile-angular-ui.core.activeLinks']);
 * ```
 *
 * **NOTE:** if you are using it without Bootstrap you may need to add some css
 * to your stylesheets to reflect the activation state of links. I.e.
 *
 * ``` css
 * a.active {
 *   color: blue;
 * }
 * ```
 */
(function() {
  'use strict';

  angular.module('mobile-angular-ui.core.activeLinks', [])
    .provider('setupActiveLinks', ['$locationProvider', function($locationProvider) {
      this.$get = [
        '$document',
        '$location',
        function($document, $location) {
          return function() {
            var currentPath = $location.path();
            var links = $document[0].links;

            for (var i = 0; i < links.length; i++) {
              var link = angular.element(links[i]);
              var href = link.attr('href');

              if (!href) {
                return link.removeClass('active');
              }

              var html5Mode = $locationProvider.html5Mode().enabled;
              if (!html5Mode) {
                var linkPrefix = '#' + $locationProvider.hashPrefix();
                if (href.slice(0, linkPrefix.length) === linkPrefix) {
                  href = href.slice(linkPrefix.length);
                } else {
                  return link.removeClass('active');
                }
              }

              if (href.charAt(0) !== '/') {
                return link.removeClass('active');
              }

              href = href.split('#')[0].split('?')[0];

              if (href === currentPath) {
                link.addClass('active');
              } else {
                link.removeClass('active');
              }
            }
          };
        }];
    }])
    .run(['$rootScope', 'setupActiveLinks', function($rootScope, setupActiveLinks) {
      $rootScope.$on('$locationChangeSuccess', setupActiveLinks);
      $rootScope.$on('$includeContentLoaded', setupActiveLinks);
    }]);
})();

/**
 * @module mobile-angular-ui.core.capture
 * @description
 *
 * The `capture` module exposes directives to var you extract markup which can
 * be used in other parts of a template using `uiContentFor` and `uiYieldTo`
 * directives.
 *
 * It provides a way to move or clone a block of markup to other parts of the document.
 *
 * This method is particularly useful to setup parts of the layout within an
 * angular view. Since blocks of html are transplanted within their original
 * `$scope` is easy to create layout interactions depending on the context.
 * Some tipical task you can accomplish with these directives are: _setup
 * the navbar title depending on the view_ or _place a submit button for a
 * form inside a navbar_.
 *
 * ## Usage
 *
 * Declare it as a dependency to your app unless you have already included some
 * of its super-modules.
 *
 * ```
 * angular.module('myApp', ['mobile-angular-ui']);
 * ```
 *
 * Or
 *
 * ```
 * angular.module('myApp', ['mobile-angular-ui']);
 * ```
 *
 * Or
 *
 * ```
 * angular.module('myApp', ['mobile-angular-ui.core.capture']);
 * ```
 *
 * Use `ui-yield-to` as a placeholder.
 *
 * ``` html
 * <!-- index.html -->
 *
 * <div class="navbar">
 *   <div ui-yield-to="title" class="navbar-brand">
 *     <span>Default Title</span>
 *   </div>
 * </div>
 *
 * <div class="app-body">
 *   <ng-view class="app-content"></ng-view>
 * </div>
 * ```
 *
 * Use `ui-content-for` inside any view to populate the `ui-yield-to` content.
 *
 * ``` html
 * <!-- myView.html -->
 *
 * <div ui-content-for="title">
 *   <span>My View Title</span>
 * </div>
 * ```
 *
 * Since the original scope is preserved you can use directives inside
 * `ui-content-for` blocks to interact with the current scope. In the following
 * example we will add a navbar button to submit a form inside a nested view.
 *
 * ``` html
 * <!-- index.html -->
 *
 * <div class="navbar">
 *   <div ui-yield-to="navbarAction">
 *   </div>
 * </div>
 *
 * <div class="app-body">
 *   <ng-view class="app-content"></ng-view>
 * </div>
 * ```
 *
 * ``` html
 * <!-- newCustomer.html -->
 *
 * <form ng-controller="newCustomerController">
 *
 *   <div class="inputs">
 *     <input type="text" ng-model="customer.name" />
 *   </div>
 *
 *   <div ui-content-for="navbarAction">
 *     <button ng-click="createCustomer()">
 *       Save
 *     </button>
 *   </div>
 *
 * </form>
 * ```
 *
 * ``` javascript
 * app.controller('newCustomerController', function($scope, Store){
 *   $scope.customer = {};
 *   $scope.createCustomer = function(){
 *     Store.create($scope.customer);
 *     // ...
 *   }
 * });
 * ```
 *
 * If you wish you can also duplicate markup instead of move it. Just add `duplicate` parameter to `uiContentFor` directive to specify this behaviour.
 *
 * ``` html
 * <div ui-content-for="navbarAction" duplicate>
 *   <button ng-click="createCustomer()">
 *     Save
 *   </button>
 * </div>
 * ```
 */
(function() {
  'use strict';

  angular.module('mobile-angular-ui.core.capture', [])

    .run([
      'Capture',
      '$rootScope',
      function(Capture, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function() {
          Capture.resetAll();
        });
      }
    ])

    .factory('Capture', [
      '$compile',
      function($compile) {
        var yielders = {};

        return {
          yielders: yielders,

          resetAll: function() {
            for (var name in yielders) {
              if (yielders.hasOwnProperty(name)) {
                this.resetYielder(name);
              }
            }
          },

          resetYielder: function(name) {
            var b = yielders[name];
            this.setContentFor(name, b.defaultContent, b.defaultScope);
          },

          putYielder: function(name, element, defaultScope, defaultContent) {
            var yielder = {};
            yielder.name = name;
            yielder.element = element;
            yielder.defaultContent = defaultContent || '';
            yielder.defaultScope = defaultScope;
            yielders[name] = yielder;
          },

          getYielder: function(name) {
            return yielders[name];
          },

          removeYielder: function(name) {
            delete yielders[name];
          },

          setContentFor: function(name, content, scope) {
            var b = yielders[name];
            if (!b) {
              return;
            }
            b.element.html(content);
            $compile(b.element.contents())(scope);
          }

        };
      }
    ])

  /**
   * @directive uiContentFor
   * @restrict A
   * @description
   *
   * `ui-content-for` makes inner contents to replace the corresponding
   * `ui-yield-to` placeholder contents.
   *
   * `uiContentFor` is intended to be used inside a view in order to populate outer placeholders.
   * Any content you send to placeholders via `ui-content-for` is
   * reverted to placeholder defaults after view changes (ie. on `$routeChangeStart`).
   *
   * @param {string} uiContentFor The id of the placeholder to be replaced
   * @param {boolean} uiDuplicate If present duplicates the content instead of moving it (default to `false`)
   *
   */
    .directive('uiContentFor', [
      'Capture',
      function(Capture) {
        return {
          compile: function(tElem, tAttrs) {
            var rawContent = tElem.html();
            if (tAttrs.uiDuplicate === null || tAttrs.uiDuplicate === undefined) {
             // no need to compile anything!
              tElem.html('');
              tElem.remove();
            }
            return function(scope, elem, attrs) {
              Capture.setContentFor(attrs.uiContentFor, rawContent, scope);
            };
          }
        };
      }
    ])

   /**
    * @directive uiYieldTo
    * @restrict A
    * @description
    *
    * `ui-yield-to` defines a placeholder which contents will be further replaced by `ui-content-for` directive.
    *
    * Inner html is considered to be a default. Default is restored any time `$routeChangeStart` happens.
    *
    * @param {string} uiYieldTo The unique id of this placeholder.
    *
    */
    .directive('uiYieldTo', [
      '$compile', 'Capture', function($compile, Capture) {
        return {
          link: function(scope, element, attr) {
            Capture.putYielder(attr.uiYieldTo, element, scope, element.html());

            element.on('$destroy', function() {
              Capture.removeYielder(attr.uiYieldTo);
            });

            scope.$on('$destroy', function() {
              Capture.removeYielder(attr.uiYieldTo);
            });
          }
        };
      }
    ]);

})();

(function() {
  'use strict';
  var module = angular.module('mobile-angular-ui.core.fastclick', []);

  module.run(['$window', function($window) {

    // Temporarly bugfix in overthrow/fastclick:
    var orgHandler = FastClick.prototype.onTouchEnd;

    // Some old versions of Android don't have Function.prototype.bind
    function bind(method, context) {
      return function() {
        return method.apply(context, arguments);
      };
    }

    FastClick.prototype.onTouchEnd = function(event) {

      if (!event.changedTouches) {
        event.changedTouches = [{}];
      }

      orgHandler = bind(orgHandler, this);
      orgHandler(event);
    };

    FastClick.attach($window.document.body);

  }]);

  angular.forEach(['select', 'input', 'textarea'], function(directiveName) {

    module.directive(directiveName, function() {
      return {
        restrict: 'E',
        compile: function(elem) {
          elem.addClass('needsclick');
        }
      };
    });
  });
})();

/**
 *
 * @module mobile-angular-ui.core.outerClick
 * @description
 *
 * Provides a directive to specifiy a behaviour when click/tap events
 * happen outside an element. This can be easily used
 * to implement eg. __close on outer click__ feature for a dropdown.
 *
 * ## Usage
 *
 * Declare it as a dependency to your app unless you have already
 * included some of its super-modules.
 *
 * ```
 * angular.module('myApp', ['mobile-angular-ui']);
 * ```
 *
 * Or
 *
 * ```
 * angular.module('myApp', ['mobile-angular-ui.core']);
 * ```
 *
 * Or
 *
 * ```
 * angular.module('myApp', ['mobile-angular-ui.core.outerClick']);
 * ```
 *
 * Use `ui-outer-click` to define an expression to evaluate when an _Outer Click_ event happens.
 * Use `ui-outer-click-if` parameter to define a condition to enable/disable the listener.
 *
 * ``` html
 * <div class="btn-group">
 *   <a ui-turn-on='myDropdown' class='btn'>
 *     <i class="fa fa-ellipsis-v"></i>
 *   </a>
 *   <ul
 *     class="dropdown-menu"
 *     ui-outer-click="Ui.turnOff('myDropdown')"
 *     ui-outer-click-if="Ui.active('myDropdown')"
 *     role="menu"
 *     ui-show="myDropdown"
 *     ui-shared-state="myDropdown"
 *     ui-turn-off="myDropdown">
 *
 *     <li><a>Action</a></li>
 *     <li><a>Another action</a></li>
 *     <li><a>Something else here</a></li>
 *     <li class="divider"></li>
 *     <li><a>Separated link</a></li>
 *   </ul>
 * </div>
 * ```
 */
(function() {
  'use strict';

  angular.module('mobile-angular-ui.core.outerClick', [])

    .factory('_mauiIsAncestorOrSelf', function() {
      return function(element, target) {
        var parent = element;
        while (parent.length > 0) {
          if (parent[0] === target[0]) {
            parent = null;
            return true;
          }
          parent = parent.parent();
        }
        parent = null;
        return false;
      };
    })

  /**
   * @service bindOuterClick
   * @as function
   *
   * @description
   * This is a service function that binds a callback to be conditionally executed
   * when a click event happens outside a specified element.
   *
   * Ie.
   *
   * ``` js
   * app.directive('myDirective', function('bindOuterClick'){
   *   return {
   *     link: function(scope, element) {
   *       bindOuterClick(element, function(scope, extra){
   *         alert('You clicked ouside me!');
   *       }, function(e){
   *         return element.hasClass('disabled') ? true : false;
   *       });
   *     }
   *   };
   * });
   * ```
   * @scope {scope} the scope to eval callbacks
   * @param {DomElement|$element} element The element to bind to.
   * @param {function} callback A `function(scope, options)`, usually the result of `$parse`, that is called when an _outer click_ event happens.
   * @param {string|function} condition Angular `$watch` expression to decide whether to run `callback` or not.
   */
    .factory('bindOuterClick', [
      '$document',
      '$timeout',
      '_mauiIsAncestorOrSelf',
      function($document, $timeout, isAncestorOrSelf) {

        return function(scope, element, outerClickFn, outerClickIf) {
          var handleOuterClick = function(event) {
            if (!isAncestorOrSelf(angular.element(event.target), element)) {
              scope.$apply(function() {
                outerClickFn(scope, {$event: event});
              });
            }
          };

          var stopWatching = angular.noop;
          var t = null;

          if (outerClickIf) {
            stopWatching = scope.$watch(outerClickIf, function(value) {
              $timeout.cancel(t);

              if (value) {
               // prevents race conditions
               // activating with other click events
                t = $timeout(function() {
                  $document.on('click tap', handleOuterClick);
                }, 0);

              } else {
                $document.unbind('click tap', handleOuterClick);
              }
            });
          } else {
            $timeout.cancel(t);
            $document.on('click tap', handleOuterClick);
          }

          scope.$on('$destroy', function() {
            stopWatching();
            $document.unbind('click tap', handleOuterClick);
          });
        };
      }
    ])

  /**
   * @directive outerClick
   *
   * @description
   * Evaluates an expression when an _Outer Click_ event happens.
   *
   * @param {expression} uiOuterClick Expression to evaluate when an _Outer Click_ event happens.
   * @param {expression} uiOuterClickIf Condition to enable/disable the listener. Defaults to `true`.
   */
    .directive('uiOuterClick', [
      'bindOuterClick',
      '$parse',
      function(bindOuterClick, $parse) {
        return {
          restrict: 'A',
          compile: function(elem, attrs) {
            var outerClickFn = $parse(attrs.uiOuterClick);
            var outerClickIf = attrs.uiOuterClickIf;
            return function(scope, elem) {
              bindOuterClick(scope, elem, outerClickFn, outerClickIf);
            };
          }
        };
      }
    ]);
})();

(function() {
  'use strict';
  /**
   * @module mobile-angular-ui.core.sharedState
   *
   * @description
   * `mobile-angular-ui.core.sharedState` is expose the homonymous service
   * `SharedState` and a group of directives to access it.
   *
   * `SharedState` allows to use elementary angular or angularish directives
   * to create interactive components.
   *
   * Ie.
   *
   * ``` html
   * <div class="nav nav-tabs" ui-shared-state='activeTab'>
   *   <a ui-set="{activeTab: 1}">Tab1</a>
   *   <a ui-set="{activeTab: 2}">Tab2</a>
   *   <a ui-set="{activeTab: 3}">Tab3</a>
   * </div>
   * <div class="tabs">
   *   <div ui-if="activeTab == 1">Tab1</div>
   *   <div ui-if="activeTab == 2">Tab2</div>
   *   <div ui-if="activeTab == 3">Tab3</div>
   * </div>
   * ```
   *
   * Using `SharedState` you will be able to:
   *
   * - Create interactive components without having to write javascript code
   * - Have your controller free from UI logic
   * - Separe `ng-click` triggering application logic from those having a visual effect only
   * - Export state of components to urls
   * - Easily make components comunicate each other
   *
   * Also note that:
   *
   * Data structures retaining statuses will stay outside angular scopes
   * thus they are not evaluated against digest cycle until its necessary.
   * Also although statuses are sort of global variables `SharedState` will
   * take care of disposing them when no scopes are requiring them anymore.
   *
   * A set of `ui-*` directives are available to interact with `SharedState`
   * module and will hopefully var you spare your controllers and your time
   * for something that is more meaningful than this:
   *
   * ``` js
   * $scope.activeTab = 1;
   *
   * $scope.setActiveTab = function(n) {
   *   $scope.activeTab = n;
   * };
   * ```
   *
   * ## Usage
   *
   * Declare it as a dependency to your app unless you have already included some
   * of its super-modules.
   *
   * ```
   * angular.module('myApp', ['mobile-angular-ui.core.sharedState']);
   * ```
   *
   * Use `ui-shared-state` directive to require/initialize a state from the target element scope
   *
   * **Example.** Tabs
   *
   * <iframe class='embedded-example' src='/examples/tabs.html'></iframe>
   *
   * **Example.** Custom components
   *
   * <iframe class='embedded-example'  src='/examples/lightbulb.html'></iframe>
   *
   * NOTE: `ui-toggle/set/turnOn/turnOff` responds to `click/tap` without
   * stopping propagation so you can use them along with ng-click too.
   * You can also change events to respond to with `ui-triggers` attribute.
   *
   * Any `SharedState` method is exposed through `Ui` object in `$rootScope`.
   * So you could always do `ng-click="Ui.turnOn('myVar')"`.
   *
   * Since `SharedState` is a service you can initialize/set statuses through
   * controllers too:
   *
   * ``` js
   * app.controller('myController', function($scope, SharedState){
   *   SharedState.initialize($scope, "activeTab", 3);
   * });
   * ```
   *
   * As well as you can use `ui-default` for that:
   *
   * ``` html
   * <div class="tabs" ui-shared-state="activeTab" ui-default="thisIsAnExpression(5 + 1 - 2)"></div>
   * ```
   *
   */
  var module = angular.module('mobile-angular-ui.core.sharedState', []);

  /**
   * @ngdoc service
   * @class SharedState
   *
   * @description
   *
   * A `SharedState` state can be considered as a global variable identified by an `id`.
   *
   * `SharedState` service exposes methods to interact with statuses to create,
   * read and update states.
   *
   * It acts as a BUS between UI elements to share UI related state that is
   * automatically disposed when all scopes requiring it are destroyed.
   *
   * eg.
   *
   * ``` js
   * app.controller('controller1', function($scope, SharedState){
   *   SharedState.initialize($scope, 'myId');
   * });
   *
   * app.controller('controller2', function(SharedState){
   *   SharedState.toggle('myId');
   * });
   * ```
   *
   * Data structures retaining statuses will stay outside angular scopes thus
   * they are not evaluated against digest cycle until its necessary. Also
   * although statuses are sort of global variables `SharedState` will take
   * care of disposing them when no scopes are requiring them anymore.
   *
   * A set of `ui-*` directives are available to interact with `SharedState`
   * module and will hopefully var you spare your controllers and your time for
   * something that is more meaningful than this:
   *
   * ``` js
   * $scope.activeTab = 1;
   *
   * $scope.setActiveTab = function(n) {
   *   $scope.activeTab = n;
   * };
   * ```
   *
   */

  /**
  * @event 'mobile-angular-ui.state.initialized.ID'
  * @shortname initialized
  * @memberOf mobile-angular-ui.core.sharedState~SharedState
  *
  * @description
  * Broadcasted on `$rootScope` when `#initialize` is called for a new state not
  * referenced by any scope currently.
  *
  * @param {any} currentValue The value with which this state has been initialized
  *
  * @memberOf mobile-angular-ui.core.sharedState~SharedState
  */

  /**
  * @event 'mobile-angular-ui.state.destroyed.ID'
  * @shortname destroyed
  * @memberOf mobile-angular-ui.core.sharedState~SharedState
  *
  * @description
  * Broadcasted on `$rootScope` when a state is destroyed.
  *
  */

  /**
 * @event 'mobile-angular-ui.state.changed.ID'
 * @shortname changed
 * @memberOf mobile-angular-ui.core.sharedState~SharedState
 *
 * @description
 * Broadcasted on `$rootScope` the value of a state changes.
 *
 * ``` js
 * $scope.$on('mobile-angular-ui.state.changed.uiSidebarLeft', function(e, newVal, oldVal) {
 *   if (newVal === true) {
 *     console.log('sidebar opened');
 *   } else {
 *     console.log('sidebar closed');
 *   }
 * });
 * ```
 *
 * @param {any} newValue
 * @param {any} oldValue
 *
 */

  module.factory('SharedState', [
    '$rootScope', '$log',
    function($rootScope, $log) {
      var values = {};    // values, context object for evals
      var statusesMeta = {};  // status info
      var scopes = {};    // scopes references
      var exclusionGroups = {}; // support exclusive boolean sets

      return {
        /**
         * @function initialize
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @description
         *
         * Initialize, or require if already intialized, a state identified by `id` within the provided `scope`, making it available to the rest of application.
         *
         * A `SharedState` is bound to one or more scopes. Each time
         * `initialize` is called for an angular `scope` this will be bound to
         * the `SharedState` and a reference count is incremented to allow
         * garbage collection.
         *
         * Reference count is decremented once the scope is destroyed. When the counter reach 0 the state will be disposed.
         *
         * @param  {scope} scope The scope to bound this state
         * @param  {string} id The unique name of this state
         * @param  {object} [options] Options
         * @param  {object} [options.defaultValue] the initialization value, it is taken into account only if the state `id` is not already initialized
         * @param  {string} [options.exclusionGroup] Specifies an exclusion group
         * for the state. This means that for boolean operations (ie. toggle,
         * turnOn, turnOf) when this state is set to `true`, any other state
         * that is in the same `exclusionGroup` will be set to `false`.
         */
        initialize: function(scope, id, options) {
          options = options || {};

          var isNewScope = scopes[scope] === undefined;
          var defaultValue = options.defaultValue;
          var exclusionGroup = options.exclusionGroup;

          scopes[scope.$id] = scopes[scope.$id] || [];
          scopes[scope.$id].push(id);

          if (!statusesMeta[id]) { // is a brand new state
            // not referenced by any
            // scope currently

            statusesMeta[id] = angular.extend({}, options, {references: 1});

            $rootScope.$broadcast('mobile-angular-ui.state.initialized.' + id, defaultValue);

            if (defaultValue !== undefined) {
              this.setOne(id, defaultValue);
            }

            if (exclusionGroup) {
              // Exclusion groups are sets of statuses references
              exclusionGroups[exclusionGroup] = exclusionGroups[exclusionGroup] || {};
              exclusionGroups[exclusionGroup][id] = true;
            }

          } else if (isNewScope) { // is a new reference from
            // a different scope
            statusesMeta[id].references++;
          }
          scope.$on('$destroy', function() {
            var ids = scopes[scope.$id] || [];
            for (var i = 0; i < ids.length; i++) {
              var status = statusesMeta[ids[i]];

              if (status.exclusionGroup) {
                delete exclusionGroups[status.exclusionGroup][ids[i]];
                if (Object.keys(exclusionGroups[status.exclusionGroup]).length === 0) {
                  delete exclusionGroups[status.exclusionGroup];
                }
              }

              status.references--;
              if (status.references <= 0) {
                delete statusesMeta[ids[i]];
                delete values[ids[i]];
                $rootScope.$broadcast('mobile-angular-ui.state.destroyed.' + id);
              }
            }
            delete scopes[scope.$id];
          });
        },

        /**
         * @function setOne
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @description
         *
         * Set the value of the state identified by `id` to the `value` parameter.
         *
         * @param  {string} id Unique identifier for state
         * @param  {any} value New value for this state
         */
        setOne: function(id, value) {
          if (statusesMeta[id] !== undefined) {
            var prev = values[id];
            values[id] = value;
            if (prev !== value) {
              $rootScope.$broadcast('mobile-angular-ui.state.changed.' + id, value, prev);
            }
            return value;
          }
          $log.warn('Warning: Attempt to set uninitialized shared state: ' + id);
        },

        /**
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         *
         * @function setMany
         * @description
         *
         * Set multiple statuses at once. ie.
         *
         * ```
         * SharedState.setMany({ activeTab: 'firstTab', sidebarIn: false });
         * ```
         *
         * @param {object} object An object of the form `{state1: value1, ..., stateN: valueN}`
         */
        setMany: function(map) {
          angular.forEach(map, function(value, id) {
            this.setOne(id, value);
          }, this);
        },

        /**
         * @function set
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @description
         *
         * A shorthand for both `setOne` and `setMany`.
         * When called with only one parameter that is an object
         * it is the same of `setMany`, otherwise is the
         * same of `setOne`.
         *
         * @param {string|object} idOrMap A state id or a `{state: value}` map object.
         * @param {any} [value] The value to assign in case idOrMap is a string.
         */
        set: function(idOrMap, value) {
          if (!idOrMap) {
            return;
          } else if (angular.isObject(idOrMap)) {
            this.setMany(idOrMap);
          } else {
            this.setOne(idOrMap, value);
          }
        },

        /**
         * @function turnOn
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @description
         *
         * Set shared state identified by `id` to `true`. If the
         * shared state has been initialized with `exclusionGroup`
         * option it will also turn off (set to `false`) all other
         * statuses from the same exclusion group.
         *
         * @param  {string} id The unique name of this state
         */
        turnOn: function(id) {
          // Turns off other statuses belonging to the same exclusion group.
          var eg = statusesMeta[id] && statusesMeta[id].exclusionGroup;
          if (eg) {
            var egStatuses = Object.keys(exclusionGroups[eg]);
            for (var i = 0; i < egStatuses.length; i++) {
              var item = egStatuses[i];
              if (item !== id) {
                this.turnOff(item);
              }
            }
          }
          return this.setOne(id, true);
        },

        /**
         * @function turnOff
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         *
         * @description
         * Set shared state identified by `id` to `false`.
         *
         * @param  {string} id The unique name of this state
         */
        turnOff: function(id) {
          return this.setOne(id, false);
        },

        /**
         * @function toggle
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @description
         *
         * If current value for shared state identified by `id` evaluates
         * to `true` it calls `turnOff` on it otherwise calls `turnOn`.
         * Be aware that it will take into account `exclusionGroup` option.
         * See `#turnOn` and `#initialize` for more.
         *
         * @param  {string} id The unique name of this state
         */
        toggle: function(id) {
          return this.get(id) ? this.turnOff(id) : this.turnOn(id);
        },

        /**
         * @function get
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         *
         * @description
         * Returns the current value of the state identified by `id`.
         *
         * @param  {string} id The unique name of this state
         * @returns {any}
         */
        get: function(id) {
          return statusesMeta[id] && values[id];
        },

        /**
         * @function isActive
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @description
         *
         * Return `true` if the boolean conversion of `#get(id)` evaluates to `true`.
         *
         * @param  {string} id The unique name of this state
         * @returns {bool}
         */
        isActive: function(id) {
          return Boolean(this.get(id));
        },

        /**
         * @function active
         * @alias mobile-angular-ui.core.sharedState~SharedState.isActive
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @description
         *
         * Alias for `#isActive`.
         *
         * @param  {string} id The unique name of this state
         * @returns {bool}
         */
        active: function(id) {
          return this.isActive(id);
        },

        /**
         * @function isUndefined
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @description
         *
         * Return `true` if state identified by `id` is not defined.
         *
         * @param  {string} id The unique name of this state
         * @returns {bool}
         */
        isUndefined: function(id) {
          return statusesMeta[id] === undefined || this.get(id) === undefined;
        },

        /**
         * Returns `true` if state identified by `id` exsists.
         *
         * @param  {string} id The unique name of this state
         * @returns {bool}
         *
         * @function has
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         */
        has: function(id) {
          return statusesMeta[id] !== undefined;
        },

        /**
         * Returns the number of references of a status.
         *
         * @param  {string} id The unique name of this state
         * @returns {integer}
         *
         * @function referenceCount
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         */
        referenceCount: function(id) {
          var status = statusesMeta[id];
          return status === undefined ? 0 : status.references;
        },

        /**
         * Returns `true` if `#get(id)` is exactly equal (`===`) to `value` param.
         *
         * @param  {string} id The unique name of this state
         * @param  {any} value The value for comparison
         * @returns {bool}
         *
         * @function equals
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         */
        equals: function(id, value) {
          return this.get(id) === value;
        },

        /**
         * Alias for `#equals`
         *
         * @param  {string} id The unique name of this state
         * @param  {any} value The value for comparison
         * @returns {bool}
         *
         * @function eq
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @alias mobile-angular-ui.core.sharedState~SharedState.equals
         */
        eq: function(id, value) {
          return this.equals(id, value);
        },

        /**
         * Returns an object with all the status values currently stored.
         * It has the form of `{statusId: statusValue}`.
         *
         * Bear in mind that in order to spare resources it currently
         * returns just the internal object retaining statuses values.
         * Thus it is not intended to be modified and direct changes to it will be not tracked or notified.
         *
         * Just clone before apply any change to it.
         *
         * @returns {object}
         *
         * @function values
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         */
        values: function() {
          return values;
        },

        exclusionGroups: function() {
          return exclusionGroups;
        }
      };
    }
  ]);

  var uiBindEvent = function(scope, element, eventNames, fn) {
    eventNames = eventNames || 'click tap';
    element.on(eventNames, function(event) {
      scope.$apply(function() {
        fn(scope, {$event: event});
      });
    });
  };

  /**
   * Calls `SharedState#initialize` on the scope relative to the element using it.
   *
   * @param {string} uiState The shared state id
   * @param {expression} [uiDefault] the default value
   *
   * @directive uiSharedState
   */
  module.directive('uiSharedState', [
    'SharedState', function(SharedState) {
      return {
        restrict: 'EA',
        priority: 601, // more than ng-if
        link: function(scope, elem, attrs) {
          var id = attrs.uiSharedState || attrs.id;
          var defaultValueExpr = attrs.uiDefault || attrs.default;
          var defaultValue = defaultValueExpr ? scope.$eval(defaultValueExpr) : undefined;

          SharedState.initialize(scope, id, {
            defaultValue: defaultValue,
            exclusionGroup: attrs.uiExclusionGroup
          });
        }
      };
    }
  ]);

  /**
   * Alias for uiSharedState. **Deprecated** since it clashes with
   * [UI-Router](https://ui-router.github.io/) `uiState` directive.
   *
   * @deprecated
   * @param {string} uiState The shared state id
   * @param {expression} [uiDefault] the default value
   *
   * @directive uiState
   */
  module.directive('uiState', [
    'SharedState', function(SharedState) {
      return {
        restrict: 'EA',
        priority: 601, // more than ng-if
        link: function(scope, elem, attrs) {
          var id = attrs.uiState || attrs.id;
          var defaultValueExpr = attrs.uiDefault || attrs.default;
          var defaultValue = defaultValueExpr ? scope.$eval(defaultValueExpr) : undefined;

          SharedState.initialize(scope, id, {
            defaultValue: defaultValue,
            exclusionGroup: attrs.uiExclusionGroup
          });
        }
      };
    }
  ]);

  angular.forEach(['toggle', 'turnOn', 'turnOff', 'set'],
    function(methodName) {
      var directiveName = 'ui' + methodName[0].toUpperCase() + methodName.slice(1);

      /**
       * Calls `SharedState#toggle` when triggering events happens on the element using it.
       *
       * @param {string} uiToggle the target shared state
       * @param {expression} uiDefault the default value
       *
       * @directive uiToggle
       */

      /**
       * @function uiTurnOn
       *
       * @description
       * Calls `SharedState#turnOn` when triggering events happens on the element using it.
       *
       *
       * @ngdoc directive
       *
       * @param {string} uiTurnOn the target shared state
       * @param {expression} uiDefault the default value
       */

      /**
       * @function uiTurnOff
       *
       * @description
       * Calls `SharedState#turnOff` when triggering events happens on the element using it.
       *
       * @ngdoc directive
       *
       * @param {string} uiTurnOff the target shared state
       * @param {string} [uiTriggers='click tap'] the event triggering the call.
       */

      /**
       * @function uiSet
       *
       * @description
       * Calls `SharedState#set` when triggering events happens on the element using it.
       *
       * @ngdoc directive
       *
       * @param {object} uiSet The object to pass to SharedState#set
       * @param {string} [uiTriggers='click tap'] the event triggering the call.
       */

      module.directive(directiveName, [
        '$parse',
        '$interpolate',
        'SharedState',
        function($parse, $interpolate, SharedState) {
          var method = SharedState[methodName];
          return {
            restrict: 'A',
            priority: 1, // This would make postLink calls happen after ngClick
                // (and similar) ones, thus intercepting events after them.
                //
                // This will prevent eventual ng-if to detach elements
                // before ng-click fires.

            compile: function(elem, attrs) {
              var attr = attrs[directiveName];
              var needsInterpolation = attr.match(/\{\{/);

              var exprFn = function($scope) {
                var res = attr;
                if (needsInterpolation) {
                  var interpolateFn = $interpolate(res);
                  res = interpolateFn($scope);
                }
                if (methodName === 'set') {
                  res = ($parse(res))($scope);
                }
                return res;
              };

              return function(scope, elem, attrs) {
                var callback = function() {
                  var arg = exprFn(scope);
                  return method.call(SharedState, arg);
                };
                uiBindEvent(scope, elem, attrs.uiTriggers, callback);
              };
            }
          };
        }
      ]);
    });

  /**
   * @name uiScopeContext
   * @inner
   * @description
   *
   * `uiScopeContext` is not a directive, but a parameter common to any of the
   * `ui-*` directives in this module.
   *
   * By default all `ui-*` conditions in this module evaluates in the context of
   * `SharedState` only, thus scope variable are not accessible. To use them you have
   * two options:
   *
   * #### 1. pre-interpolation
   *
   * You can use pre-interpolation in expression attribute. For instance the following syntax
   * is ligit:
   *
   * ``` html
   * <div ui-if='state{{idx}}'><!-- ... --></div>
   * ```
   *
   * In this case `idx` value is taken from scope and embedded into
   * conditions before parse them.
   *
   * This works as expected and is fine for the most cases, but it has a little caveat:
   *
   * The condition has to be re-parsed at each digest loop and has to walk scopes
   * in watchers.
   *
   * #### 2. uiScopeContext
   *
   * If you are concerned about performance issues using the first approach
   * `uiScopeContext` is a more verbose but also lightweight alternative
   * to accomplish the same.
   *
   * It allows to use current scope vars inside `ui-*` conditions, leaving
   * other scope vars (or the entire scope if not present) apart from the
   * condition evaluation process.
   *
   * Hopefully this will keep evaluation running against a flat and small data
   * structure instead of taking into account the whole scope.
   *
   * It is a list `scopeVar[ as aliasName] [, ...]` specifing one of more scope
   * variables to take into account when evaluating conditions. ie:
   *
   * ``` html
   * <!-- use item from ng-repeat -->
   * <div ui-if="openPanel == i" ui-scope-context='i' ng-repeat="i in [1,2,3]">
   *   <div class="panel-body">
   *     <!-- ... -->
   *   </div>
   * </div>
   * ```
   *
   * ``` html
   * <div ui-if="sharedState1 == myVar1 && sharedState2 == myVar2"
   *   ui-scope-context="myVar1, myVar2"
   * >
   * </div>
   * ```
   *
   * Be aware that scope vars will take precedence over sharedStates so,
   * in order to avoid name clashes you can use 'as' to refer to scope vars
   * with a different name in conditions:
   *
   * ``` html
   * <div ui-if="x == myVar1 && y == myVar2"
   *   ui-scope-context="x as myVar1, y as myVar2"
   * >
   * </div>
   * ```
   */
  var parseScopeContext = function(attr) {
    if (!attr || attr === '') {
      return [];
    }
    var vars = attr ? attr.trim().split(/ *, */) : [];
    var res = [];
    for (var i = 0; i < vars.length; i++) {
      var item = vars[i].split(/ *as */);
      if (item.length > 2 || item.length < 1) {
        throw new Error('Error parsing uiScopeContext="' + attr + '"');
      }
      res.push(item);
    }
    return res;
  };

  var mixScopeContext = function(context, scopeVars, scope) {
    for (var i = 0; i < scopeVars.length; i++) {
      var key = scopeVars[i][0];
      var alias = scopeVars[i][1] || key;
      context[alias] = key.split('.').reduce(function(scope, nextKey) {
        return scope[nextKey];
      }, scope);
    }
  };

  var parseUiCondition = function(name, attrs, $scope, SharedState, $parse, $interpolate) {
    var expr = attrs[name];
    var needsInterpolation = expr.match(/\{\{/);
    var exprFn;

    if (needsInterpolation) {
      exprFn = function(context) {
        var interpolateFn = $interpolate(expr);
        var parseFn = $parse(interpolateFn($scope));
        return parseFn(context);
      };
    } else {
      exprFn = $parse(expr);
    }

    var uiScopeContext = parseScopeContext(attrs.uiScopeContext);
    return function() {
      var context;
      if (uiScopeContext.length) {
        context = angular.extend({}, SharedState.values());
        mixScopeContext(context, uiScopeContext, $scope);
      } else {
        context = SharedState.values();
      }
      return exprFn(context);
    };
  };

  /**
    * @ngdoc directive
    * @function uiIf
    *
    * @description
    * Same as `ngIf` but evaluates condition against `SharedState` statuses too
    *
    * @param {expression} uiIf A condition to decide wether to attach the
    * element to the dom
    * @param {list} [uiScopeContext] A list `scopeVar[ as aliasName] [, ...]`
    * specifing one of more scope variables to take into account when
    * evaluating condition.
    */
  module.directive('uiIf', ['$animate', 'SharedState', '$parse', '$interpolate', function($animate, SharedState, $parse, $interpolate) {
    function getBlockNodes(nodes) {
      var node = nodes[0];
      var endNode = nodes[nodes.length - 1];
      var blockNodes = [node];
      do {
        node = node.nextSibling;
        if (!node) {
          break;
        }
        blockNodes.push(node);
      } while (node !== endNode);

      return angular.element(blockNodes);
    }

    return {
      multiElement: true,
      transclude: 'element',
      priority: 600,
      terminal: true,
      restrict: 'A',
      $$tlb: true,
      link: function($scope, $element, $attr, ctrl, $transclude) {
        var block;
        var childScope;
        var previousElements;
        var uiIfFn = parseUiCondition('uiIf', $attr, $scope, SharedState, $parse, $interpolate);

        $scope.$watch(uiIfFn, function uiIfWatchAction(value) {
          if (value) {
            if (!childScope) {
              $transclude(function(clone, newScope) {
                childScope = newScope;
                clone[clone.length++] = document.createComment(' end uiIf: ' + $attr.uiIf + ' ');
                  // Note: We only need the first/last node of the cloned nodes.
                  // However, we need to keep the reference to the jqlite wrapper as it might be changed later
                  // by a directive with templateUrl when its template arrives.
                block = {
                  clone: clone
                };
                $animate.enter(clone, $element.parent(), $element);
              });
            }
          } else {
            if (previousElements) {
              previousElements.remove();
              previousElements = null;
            }
            if (childScope) {
              childScope.$destroy();
              childScope = null;
            }
            if (block) {
              previousElements = getBlockNodes(block.clone);
              var done = function() {
                previousElements = null;
              };
              var nga = $animate.leave(previousElements, done);
              if (nga) {
                nga.then(done);
              }
              block = null;
            }
          }
        });
      }
    };
  }]);

  /**
   * @ngdoc directive
   * @function uiHide
   *
   * @description
   * Same as `ngHide` but evaluates condition against `SharedState` statuses
   *
   * @param {expression} uiShow A condition to decide wether to hide the element
   * @param {list} [uiScopeContext] A list `scopeVar[ as aliasName] [, ...]`
   * specifing one of more scope variables to take into account when evaluating condition.
   */
  module.directive('uiHide', ['$animate', 'SharedState', '$parse', '$interpolate', function($animate, SharedState, $parse, $interpolate) {
    var NG_HIDE_CLASS = 'ng-hide';
    var NG_HIDE_IN_PROGRESS_CLASS = 'ng-hide-animate';

    return {
      restrict: 'A',
      multiElement: true,
      link: function(scope, element, attr) {
        var uiHideFn = parseUiCondition('uiHide', attr, scope, SharedState, $parse, $interpolate);
        scope.$watch(uiHideFn, function uiHideWatchAction(value) {
          $animate[value ? 'addClass' : 'removeClass'](element, NG_HIDE_CLASS, {
            tempClasses: NG_HIDE_IN_PROGRESS_CLASS
          });
        });
      }
    };
  }]);

  /**
   * @ngdoc directive
   * @function uiShow
   *
   * @description
   * Same as `ngShow` but evaluates condition against `SharedState` statuses
   *
   * @param {expression} uiShow A condition to decide wether to show the element
   * @param {list} [uiScopeContext] A list `scopeVar[ as aliasName] [, ...]`
   * specifing one of more scope variables to take into account when evaluating condition.
   */
  module.directive('uiShow', ['$animate', 'SharedState', '$parse', '$interpolate', function($animate, SharedState, $parse) {
    var NG_HIDE_CLASS = 'ng-hide';
    var NG_HIDE_IN_PROGRESS_CLASS = 'ng-hide-animate';

    return {
      restrict: 'A',
      multiElement: true,
      link: function(scope, element, attr) {
        var uiShowFn = parseUiCondition('uiShow', attr, scope, SharedState, $parse);
        scope.$watch(uiShowFn, function uiShowWatchAction(value) {
          $animate[value ? 'removeClass' : 'addClass'](element, NG_HIDE_CLASS, {
            tempClasses: NG_HIDE_IN_PROGRESS_CLASS
          });
        });
      }
    };
  }]);

  /**
   * @ngdoc directive
   * @function uiClass
   *
   * @description
   * A simplified version of `ngClass` that evaluates in context of `SharedState`, it only suppors the `{'className': expr}` syntax.
   *
   * @param {expression} uiClass An expression that has to evaluate to an object
   * of the form `{'className': expr}`, where `expr` decides wether the class
   * should appear to element's class list.
   * @param {list} [uiScopeContext] A list `scopeVar[ as aliasName] [, ...]`
   * specifing one of more scope variables to take into account when evaluating
   * condition.
   */
  module.directive('uiClass', ['SharedState', '$parse', '$interpolate', function(SharedState, $parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var uiClassFn = parseUiCondition('uiClass', attr, scope, SharedState, $parse);
        scope.$watch(uiClassFn, function uiClassWatchAction(value) {
          var classesToAdd = '';
          var classesToRemove = '';
          angular.forEach(value, function(expr, className) {
            if (expr) {
              classesToAdd += ' ' + className;
            } else {
              classesToRemove += ' ' + className;
            }
            classesToAdd = classesToAdd.trim();
            classesToRemove = classesToRemove.trim();
            if (classesToAdd.length) {
              element.addClass(classesToAdd);
            }
            if (classesToRemove.length) {
              element.removeClass(classesToRemove);
            }
          });
        }, true);
      }
    };
  }]);

  module.run([
    '$rootScope',
    'SharedState',
    function($rootScope, SharedState) {
      $rootScope.Ui = SharedState;
    }
  ]);

})();

/**
 * Provides directives and service to prevent touchmove default behaviour
 * for touch devices (ie. bounce on overscroll in IOS).
 *
 * #### Usage
 *
 * Use `ui-prevent-touchmove-defaults` directive on root element of your app:
 *
 * ``` html
 * <body ng-app='myApp' ui-prevent-touchmove-defaults>
 *   <!-- ... -->
 * </body>
 * ```
 *
 * Doing so `touchmove.preventDefault` logic for inner elements is inverted,
 * so any `touchmove` default behaviour is automatically prevented.
 *
 * If you wish to allow the default behaviour, for example to allow
 * inner elements to scroll, you have to explicitly mark an event to allow
 * touchmove default.
 *
 * Mobile Angular UI already handles this for `scrollable` elements, so you don't have
 * to do anything in order to support scroll.
 *
 * If you wish to allow touchmove defaults for certain element under certain conditions
 * you can use the `allowTouchmoveDefault` service.
 *
 * ie.
 *
 * ``` js
 * // always allow touchmove default for an element
 * allowTouchmoveDefault(myelem);
 * ```
 *
 * ``` js
 * // allow touchmove default for an element only under certain conditions
 * allowTouchmoveDefault(myelem, function(touchmove){
 *   return touchmove.pageY > 100;
 * });
 * ```
 *
 * @module mobile-angular-ui.core.touchmoveDefaults
 */
(function() {
  'use strict';
  var module = angular.module('mobile-angular-ui.core.touchmoveDefaults', []);

  module.directive('uiPreventTouchmoveDefaults', function() {
    var preventTouchmoveDefaultsCb = function(e) {
      // Get this flag from either the saved event if jQuery is being used, otherwise get it from the event itself.
      var allowTouchmoveEventFlag = e.originalEvent ? e.originalEvent.allowTouchmoveDefault : e.allowTouchmoveDefault;
      if (allowTouchmoveEventFlag !== true) {
        e.preventDefault();
      }
    };

    return {
      compile: function(element) {
        if ('ontouchmove' in document) {
          element.on('touchmove', preventTouchmoveDefaultsCb);
        }
      }
    };
  });

  /**
   * Bind a listener to an element to allow `touchmove` default behaviour
   * when `touchmove` happens inside the bound element.
   *
   * You can also provide a function to decide when to allow and
   * when to prevent it.
   *
   * ``` js
   * // always allow touchmove default
   * allowTouchmoveDefault(myelem);
   *
   * // allow touchmove default only under certain conditions
   * allowTouchmoveDefault(myelem, function(touchmove){
   *   return touchmove.pageY > 100;
   * });
   * ```
   *
   * @param {Element|$element} element The element to bind.
   * @param {function} condition A `function(touchmove)⟶boolean` to decide
   *                             whether to allow default behavior or not.
   *
   * @service allowTouchmoveDefault
   * @as function
   * @returns function Function to unbind the listener
   */

  module.factory('allowTouchmoveDefault', function() {
    var fnTrue = function() {
      return true;
    };

    if ('ontouchmove' in document) {
      return function($element, condition) {
        condition = condition || fnTrue;

        var allowTouchmoveDefaultCallback = function(e) {
          if (condition(e)) {
            e.allowTouchmoveDefault = true;
              // jQuery normalizes the event object, need to put this property on the copied originalEvent.
            if (e.originalEvent) {
              e.originalEvent.allowTouchmoveDefault = true;
            }
          }
        };

        $element = angular.element($element);
        $element.on('touchmove', allowTouchmoveDefaultCallback);

        $element.on('$destroy', function() {
          $element.off('touchmove', allowTouchmoveDefaultCallback);
          $element = null;
        });

        return function() {
          if ($element) {
            $element.off('touchmove', allowTouchmoveDefaultCallback);
          }
        };
      };
    }

    return angular.noop;
  });

})();

/**
 * @module mobile-angular-ui.core
 *
 * @description
 *
 * It has all the core functionalities of Mobile Angular UI. It aims to act as a common base
 * for an UI framework providing services and directives to create components and implement
 * UI interactions with angular.
 *
 * <div class="alert alert-success">
 *   <b>NOTE</b>
 *   <ul>
 *     <li>It has no dependency on Bootstrap.</li>
 *     <li>It is not related to mobile apps only.</li>
 *     <li>It is not requiring CSS support.</li>
 *     <li><b>You can use it on any Angular Application and with any CSS framework.</b></li>
 *   </ul>
 * </div>
 *
 * ## Standalone Usage
 *
 * Although `.core` module is required by `mobile-angular-ui` by default you can use it alone.
 *
 * ``` js
 * angular.module('myApp', ['mobile-angular-ui.core']);
 * ```
 */
(function() {
  'use strict';
  angular.module('mobile-angular-ui.core', [
    'mobile-angular-ui.core.fastclick',
    'mobile-angular-ui.core.activeLinks',
    'mobile-angular-ui.core.capture',
    'mobile-angular-ui.core.outerClick',
    'mobile-angular-ui.core.sharedState',
    'mobile-angular-ui.core.touchmoveDefaults'
  ]);
})();

/*! Overthrow. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt */
(function( w, undefined ){

	var doc = w.document,
		docElem = doc.documentElement,
		enabledClassName = "overthrow-enabled",

		// Touch events are used in the polyfill, and thus are a prerequisite
		canBeFilledWithPoly = "ontouchmove" in doc,

		// The following attempts to determine whether the browser has native overflow support
		// so we can enable it but not polyfill
		nativeOverflow =
			// Features-first. iOS5 overflow scrolling property check - no UA needed here. thanks Apple :)
			"WebkitOverflowScrolling" in docElem.style ||
			// Test the windows scrolling property as well
			"msOverflowStyle" in docElem.style ||
			// Touch events aren't supported and screen width is greater than X
			// ...basically, this is a loose "desktop browser" check.
			// It may wrongly opt-in very large tablets with no touch support.
			( !canBeFilledWithPoly && w.screen.width > 800 ) ||
			// Hang on to your hats.
			// Whitelist some popular, overflow-supporting mobile browsers for now and the future
			// These browsers are known to get overlow support right, but give us no way of detecting it.
			(function(){
				var ua = w.navigator.userAgent,
					// Webkit crosses platforms, and the browsers on our list run at least version 534
					webkit = ua.match( /AppleWebKit\/([0-9]+)/ ),
					wkversion = webkit && webkit[1],
					wkLte534 = webkit && wkversion >= 534;

				return (
					/* Android 3+ with webkit gte 534
					~: Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13 */
					ua.match( /Android ([0-9]+)/ ) && RegExp.$1 >= 3 && wkLte534 ||
					/* Blackberry 7+ with webkit gte 534
					~: Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0 Mobile Safari/534.11+ */
					ua.match( / Version\/([0-9]+)/ ) && RegExp.$1 >= 0 && w.blackberry && wkLte534 ||
					/* Blackberry Playbook with webkit gte 534
					~: Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.8+ (KHTML, like Gecko) Version/0.0.1 Safari/534.8+ */
					ua.indexOf( "PlayBook" ) > -1 && wkLte534 && !ua.indexOf( "Android 2" ) === -1 ||
					/* Firefox Mobile (Fennec) 4 and up
					~: Mozilla/5.0 (Mobile; rv:15.0) Gecko/15.0 Firefox/15.0 */
					ua.match(/Firefox\/([0-9]+)/) && RegExp.$1 >= 4 ||
					/* WebOS 3 and up (TouchPad too)
					~: Mozilla/5.0 (hp-tablet; Linux; hpwOS/3.0.0; U; en-US) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/233.48 Safari/534.6 TouchPad/1.0 */
					ua.match( /wOSBrowser\/([0-9]+)/ ) && RegExp.$1 >= 233 && wkLte534 ||
					/* Nokia Browser N8
					~: Mozilla/5.0 (Symbian/3; Series60/5.2 NokiaN8-00/012.002; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/533.4 (KHTML, like Gecko) NokiaBrowser/7.3.0 Mobile Safari/533.4 3gpp-gba
					~: Note: the N9 doesn't have native overflow with one-finger touch. wtf */
					ua.match( /NokiaBrowser\/([0-9\.]+)/ ) && parseFloat(RegExp.$1) === 7.3 && webkit && wkversion >= 533
				);
			})();

	// Expose overthrow API
	w.overthrow = {};

	w.overthrow.enabledClassName = enabledClassName;

	w.overthrow.addClass = function(){
		if( docElem.className.indexOf( w.overthrow.enabledClassName ) === -1 ){
			docElem.className += " " + w.overthrow.enabledClassName;
		}
	};

	w.overthrow.removeClass = function(){
		docElem.className = docElem.className.replace( w.overthrow.enabledClassName, "" );
	};

	// Enable and potentially polyfill overflow
	w.overthrow.set = function(){

		// If nativeOverflow or at least the element canBeFilledWithPoly, add a class to cue CSS that assumes overflow scrolling will work (setting height on elements and such)
		if( nativeOverflow ){
			w.overthrow.addClass();
		}

	};

	// expose polyfillable
	w.overthrow.canBeFilledWithPoly = canBeFilledWithPoly;

	// Destroy everything later. If you want to.
	w.overthrow.forget = function(){

		w.overthrow.removeClass();

	};

	// Expose overthrow API
	w.overthrow.support = nativeOverflow ? "native" : "none";

})( this );

/*! Overthrow. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt */
(function( w, undefined ){

	// Auto-init
	w.overthrow.set();

}( this ));
/*! Overthrow. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt */
(function( w, o, undefined ){

	// o is overthrow reference from overthrow-polyfill.js
	if( o === undefined ){
		return;
	}

	o.scrollIndicatorClassName = "overthrow";

	var doc = w.document,
		docElem = doc.documentElement,
		// o api
		nativeOverflow = o.support === "native",
		canBeFilledWithPoly = o.canBeFilledWithPoly,
		configure = o.configure,
		set = o.set,
		forget = o.forget,
		scrollIndicatorClassName = o.scrollIndicatorClassName;

	// find closest overthrow (elem or a parent)
	o.closest = function( target, ascend ){
		return !ascend && target.className && target.className.indexOf( scrollIndicatorClassName ) > -1 && target || o.closest( target.parentNode );
	};

	// polyfill overflow
	var enabled = false;
	o.set = function(){

		set();

		// If nativeOverflow or it doesn't look like the browser canBeFilledWithPoly, our job is done here. Exit viewport left.
		if( enabled || nativeOverflow || !canBeFilledWithPoly ){
			return;
		}

		w.overthrow.addClass();

		enabled = true;

		o.support = "polyfilled";

		o.forget = function(){
			forget();
			enabled = false;
			// Remove touch binding (check for method support since this part isn't qualified by touch support like the rest)
			if( doc.removeEventListener ){
				doc.removeEventListener( "touchstart", start, false );
			}
		};

		// Fill 'er up!
		// From here down, all logic is associated with touch scroll handling
			// elem references the overthrow element in use
		var elem,

			// The last several Y values are kept here
			lastTops = [],

			// The last several X values are kept here
			lastLefts = [],

			// lastDown will be true if the last scroll direction was down, false if it was up
			lastDown,

			// lastRight will be true if the last scroll direction was right, false if it was left
			lastRight,

			// For a new gesture, or change in direction, reset the values from last scroll
			resetVertTracking = function(){
				lastTops = [];
				lastDown = null;
			},

			resetHorTracking = function(){
				lastLefts = [];
				lastRight = null;
			},

			// On webkit, touch events hardly trickle through textareas and inputs
			// Disabling CSS pointer events makes sure they do, but it also makes the controls innaccessible
			// Toggling pointer events at the right moments seems to do the trick
			// Thanks Thomas Bachem http://stackoverflow.com/a/5798681 for the following
			inputs,
			setPointers = function( val ){
				/*inputs = elem.querySelectorAll( "textarea, input" );
				for( var i = 0, il = inputs.length; i < il; i++ ) {
					inputs[ i ].style.pointerEvents = val;
				}*/
			},

			// For nested overthrows, changeScrollTarget restarts a touch event cycle on a parent or child overthrow
			changeScrollTarget = function( startEvent, ascend ){
				if( doc.createEvent ){
					var newTarget = ( !ascend || ascend === undefined ) && elem.parentNode || elem.touchchild || elem,
						tEnd;

					if( newTarget !== elem ){
						tEnd = doc.createEvent( "HTMLEvents" );
						tEnd.initEvent( "touchend", true, true );
						elem.dispatchEvent( tEnd );
						newTarget.touchchild = elem;
						elem = newTarget;
						newTarget.dispatchEvent( startEvent );
					}
				}
			},

			// Touchstart handler
			// On touchstart, touchmove and touchend are freshly bound, and all three share a bunch of vars set by touchstart
			// Touchend unbinds them again, until next time
			start = function( e ){

				// Stop any throw in progress
				if( o.intercept ){
					o.intercept();
				}

				// Reset the distance and direction tracking
				resetVertTracking();
				resetHorTracking();

				elem = o.closest( e.target );

				if( !elem || elem === docElem || e.touches.length > 1 ){
					return;
				}

				setPointers( "none" );
				var touchStartE = e,
					scrollT = elem.scrollTop,
					scrollL = elem.scrollLeft,
					height = elem.offsetHeight,
					width = elem.offsetWidth,
					startY = e.touches[ 0 ].pageY,
					startX = e.touches[ 0 ].pageX,
					scrollHeight = elem.scrollHeight,
					scrollWidth = elem.scrollWidth,

					// Touchmove handler
					move = function( e ){

						var ty = scrollT + startY - e.touches[ 0 ].pageY,
							tx = scrollL + startX - e.touches[ 0 ].pageX,
							down = ty >= ( lastTops.length ? lastTops[ 0 ] : 0 ),
							right = tx >= ( lastLefts.length ? lastLefts[ 0 ] : 0 );

						// If there's room to scroll the current container, prevent the default window scroll
						if( ( ty > 0 && ty < scrollHeight - height ) || ( tx > 0 && tx < scrollWidth - width ) ){
							e.preventDefault();
						}
						// This bubbling is dumb. Needs a rethink.
						else {
							changeScrollTarget( touchStartE );
						}

						// If down and lastDown are inequal, the y scroll has changed direction. Reset tracking.
						if( lastDown && down !== lastDown ){
							resetVertTracking();
						}

						// If right and lastRight are inequal, the x scroll has changed direction. Reset tracking.
						if( lastRight && right !== lastRight ){
							resetHorTracking();
						}

						// remember the last direction in which we were headed
						lastDown = down;
						lastRight = right;

						// set the container's scroll
						elem.scrollTop = ty;
						elem.scrollLeft = tx;

						lastTops.unshift( ty );
						lastLefts.unshift( tx );

						if( lastTops.length > 3 ){
							lastTops.pop();
						}
						if( lastLefts.length > 3 ){
							lastLefts.pop();
						}
					},

					// Touchend handler
					end = function( e ){

						// Bring the pointers back
						setPointers( "auto" );
						setTimeout( function(){
							setPointers( "none" );
						}, 450 );
						elem.removeEventListener( "touchmove", move, false );
						elem.removeEventListener( "touchend", end, false );
					};

				elem.addEventListener( "touchmove", move, false );
				elem.addEventListener( "touchend", end, false );
			};

		// Bind to touch, handle move and end within
		doc.addEventListener( "touchstart", start, false );
	};

})( this, this.overthrow );

/**
 * This module will provide directives to create modals and overlays components.
 *
 * @module mobile-angular-ui.components.modals
 */
(function() {
  'use strict';
  angular.module('mobile-angular-ui.components.modals', [])

  /**
   * A directive to create modals and overlays components.
   *
   * Modals are basically the same of Bootstrap 3 but you have to use uiSharedState
   * with `ngIf/uiIf` or `ngHide/uiHide` to `activate/dismiss` it.
   *
   * By default both modals and overlay are made always showing up by
   * css rule `.modal {display:block}`, so you can use it with
   * `ngAnimate` and other angular directives in a simpler way.
   *
   * Overlay are a style of modal that looks more native in mobile devices providing a blurred
   * overlay as background.
   *
   * You can create an overlay adding `.modal-overlay` class to a modal.
   *
   * ### Note
   *
   * For modals and overlays to cover the entire page you have to attach them
   * as child of `body` element. To achieve this from a view is a common use for
   * `contentFor/yieldTo` directives contained from
   * [capture module](/docs/module:mobile-angular-ui/module:core/module:capture):
   *
   * ``` html
   * <body ng-app="myApp">
   *
   *   <!-- ... -->
   *   <!-- Modals and Overlays -->
   *   <div ui-yield-to="modals"></div>
   *
   * </body>
   * ```
   *
   * Then you can wrap your modals and overlays in `contentFor`:
   *
   * ``` html
   * <div ui-content-for="modals">
   * * <div class="modal"><!-- ... --></div>
   * </div>
   * ```
   *
   * **Example.** Create a Modal.
   *
   * ``` html
   * <div ui-content-for="modals">
   *   <div class="modal" ui-if="modal1" ui-shared-state='modal1'>
   *     <div class="modal-backdrop in"></div>
   *     <div class="modal-dialog">
   *       <div class="modal-content">
   *         <div class="modal-header">
   *           <button class="close"
   *                   ui-turn-off="modal1">&times;</button>
   *           <h4 class="modal-title">Modal title</h4>
   *         </div>
   *         <div class="modal-body">
   *           <p>Lorem ipsum ...</p>
   *         </div>
   *         <div class="modal-footer">
   *           <button ui-turn-off="modal1" class="btn btn-default">Close</button>
   *           <button ui-turn-off="modal1" class="btn btn-primary">Save changes</button>
   *         </div>
   *       </div>
   *     </div>
   *   </div>
   * </div>
   * ```
   *
   * **Example.** Create an Overlay.
   *
   * ``` html
   * <div ui-content-for="modals">
   *   <div class="modal modal-overlay" ui-if='modal2' ui-shared-state='modal2'>
   *     <div class="modal-dialog">
   *       <div class="modal-content">
   *         <div class="modal-header">
   *           <button class="close"
   *                   ui-turn-off="modal2">&times;</button>
   *           <h4 class="modal-title">Modal title</h4>
   *         </div>
   *         <div class="modal-body">
   *           <p>Lorem ipsum ...</p>
   *         </div>
   *         <div class="modal-footer">
   *           <button ui-turn-off="modal2" class="btn btn-default">Close</button>
   *           <button ui-turn-off="modal2" class="btn btn-primary">Save changes</button>
   *         </div>
   *       </div>
   *     </div>
   *   </div>
   * </div>
   * ```
   *
   * @directive modal
   * @restrict C
   */
    .directive('modal', [
      '$rootElement',
      function($rootElement) {
        return {
          restrict: 'C',
          link: function(scope, elem) {
            $rootElement.addClass('has-modal');
            elem.on('$destroy', function() {
              $rootElement.removeClass('has-modal');
            });
            scope.$on('$destroy', function() {
              $rootElement.removeClass('has-modal');
            });

            if (elem.hasClass('modal-overlay')) {
              $rootElement.addClass('has-modal-overlay');
              elem.on('$destroy', function() {
                $rootElement.removeClass('has-modal-overlay');
              });
              scope.$on('$destroy', function() {
                $rootElement.removeClass('has-modal-overlay');
              });
            }
          }
        };
      }]);
})();

/**
 * @module mobile-angular-ui.components.navbars
 * @description
 *
 * Bootstrap default navbars are awesome for responsive websites, but are not the
 * best with a small screen. Also fixed positioning is yet not an option to create
 * navbars standing in top or bottom of the screen.
 *
 * Mobile Angular Ui offers an alternative to bootstrap navbars that is more
 * suitable for mobile.
 *
 * It uses scrollable areas to avoid scroll issues. In the following figure you can
 * see the difference between fixed navbars and navbars with absolute positioning.
 *
 * <figure class="full-width-figure">
 *   <img src="/assets/img/figs/fixed-overflow.png" alt=""/>
 * </figure>
 *
 * Here is the basic markup to achieve this.
 *
 * ``` html
 * <div class="app">
 *   <div class="navbar navbar-app navbar-absolute-top">
 *     <!-- ... -->
 *   </div>
 *
 *   <div class="navbar navbar-app navbar-absolute-bottom">
 *     <!-- ... -->
 *   </div>
 *
 *   <div class="app-body">
 *     <ng-view></ng-view>
 *   </div>
 * </div>
 * ```
 *
 * As you can notice the base class is `.navbar-app` while the positioning is
 * obtained adding either `.navbar-absolute-top` or `.navbar-absolute-bottom`
 * class.
 *
 * ### Mobile Navbar Layout
 *
 * Top navbar in mobile design most of the times follows a clear pattern: a
 * centered title surrounded by one or two action buttons, the _back_ or the
 * _menu_ buttons are two common examples.
 *
 * Twitter Bootstrap ships with a different arrangement of components for navbars
 * since they are supposed to host an horizontal navigation menu.
 *
 * `.navbar-app` is specifically designed to support this different type of
 * `.interaction and arrangement.
 *
 * Consider the following example:
 *
 * ``` html
 * <div class="navbar navbar-app navbar-absolute-top">
 *
 *   <div class="navbar-brand navbar-brand-center">
 *     Navbar Brand
 *   </div>
 *
 *   <div class="btn-group pull-left">
 *     <div class="btn btn-navbar">
 *       Left Action
 *     </div>
 *   </div>
 *
 *   <div class="btn-group pull-right">
 *     <div class="btn btn-navbar">
 *       Right Action
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * `.navbar-brand-center` is a specialization of BS3's `.navbar-brand`.  It will
 * render the title centered and below the two button groups. Note that `.navbar-
 * brand-center` will position the title with absolute positioning ensuring that
 * it will never cover the buttons, which would cause interaction problems.
 *
 */

(function() {
  'use strict';

  var module = angular.module('mobile-angular-ui.components.navbars', []);

  /**
   * @directive navbarAbsoluteTop
   * @restrict C
   * @description
   *
   * Setup absolute positioned top navbar.
   *
   * ``` html
   *  <div class="navbar navbar-app navbar-absolute-top">
   *    <!-- ... -->
   *  </div>
   * ```
   */

  /**
   * @directive navbarAbsoluteBottom
   * @restrict C
   * @description
   *
   * Setup absolute positioned bottom navbar.
   *
   * ``` html
   *  <div class="navbar navbar-app navbar-absolute-bottom">
   *    <!-- ... -->
   *  </div>
   * ```
   */
  angular.forEach(['top', 'bottom'], function(side) {
    var directiveName = 'navbarAbsolute' + side.charAt(0).toUpperCase() + side.slice(1);
    module.directive(directiveName, [
      '$rootElement',
      function($rootElement) {
        return {
          restrict: 'C',
          link: function(scope) {
            $rootElement.addClass('has-navbar-' + side);
            scope.$on('$destroy', function() {
              $rootElement.removeClass('has-navbar-' + side);
            });
          }
        };
      }
    ]);
  });
})();

/**
 * @module mobile-angular-ui.components.scrollable
 * @description
 *
 * One thing you'll always have to deal with approaching mobile web app
 * development is scroll and `position:fixed` bugs.
 *
 * Due to the lack of support in some devices fixed positioned elements may
 * bounce or disappear during scroll. Also mobile interaction often leverages
 * horizontal scroll eg. in carousels or sliders.
 *
 * We use `overflow:auto` to create scrollable areas and solve any problems
 * related to scroll.
 *
 * Since `overflow:auto` is not always available in touch devices we use [Overthrow](http://filamentgroup.github.io/Overthrow/) to polyfill that.
 *
 * Markup for any scrollable areas is as simple as:
 *
 * ``` html
 * <div class="scrollable">
 *   <div class="scrollable-content">...</div>
 * </div>
 * ```
 *
 * This piece of code will trigger a directive that properly setup a new `Overthrow`
 * instance for the `.scrollable` node.
 *
 * #### Headers and footers
 *
 * `.scrollable-header/.scrollable-footer` can be used to add fixed header/footer
 * to a scrollable area without having to deal with css height and positioning to
 * avoid breaking scroll.
 *
 * ``` html
 * <div class="scrollable">
 *   <div class="scrollable-header"><!-- ... --></div>
 *   <div class="scrollable-content"><!-- ... --></div>
 *   <div class="scrollable-footer"><!-- ... --></div>
 * </div>
 * ```
 *
 * #### scrollTo
 *
 * `.scrollable-content` controller exposes a `scrollTo` function: `scrollTo(offsetOrElement, margin)`
 *
 * You have to require it in your directives to use it or obtain through `element().controller`:
 *
 * ``` js
 * var elem = element(document.getElementById('myScrollableContent'));
 * var scrollableContentController = elem.controller('scrollableContent');
 *
 * // - Scroll to top of containedElement
 * scrollableContentController.scrollTo(containedElement);
 *
 * // - Scroll to top of containedElement with a margin of 10px;
 * scrollableContentController.scrollTo(containedElement, 10);
 *
 * // - Scroll top by 200px;
 * scrollableContentController.scrollTo(200);
 * ```
 *
 * #### `ui-scroll-bottom/ui-scroll-top`
 *
 * You can use `ui-scroll-bottom/ui-scroll-top` directives handle that events and implement features like _infinite scroll_.
 *
 * ``` html
 * <div class="scrollable">
 *   <div class="scrollable-content section" ui-scroll-bottom="loadMore()">
 *     <ul>
 *       <li ng-repeat="item in items">
 *         {{item.name}}
 *       </li>
 *     </ul>
 *   </div>
 * </div>
 * ```
 */
(function() {
  'use strict';
  var module = angular.module('mobile-angular-ui.components.scrollable',
    ['mobile-angular-ui.core.touchmoveDefaults']);

  var getTouchY = function(event) {
    var touches = event.touches && event.touches.length ? event.touches : [event];
    var e = (event.changedTouches && event.changedTouches[0]) ||
        (event.originalEvent && event.originalEvent.changedTouches &&
            event.originalEvent.changedTouches[0]) ||
        touches[0].originalEvent || touches[0];

    return e.clientY;
  };

  module.directive('scrollableContent', function() {
    return {
      restrict: 'C',
      controller: ['$element', '$document', 'allowTouchmoveDefault', function($element, $document, allowTouchmoveDefault) {
        var scrollableContent = $element[0];
        var scrollable = $element.parent()[0];

        // Handle nobounce behaviour
        if ('ontouchmove' in $document[0]) {
          var allowUp;
          var allowDown;
          var lastY;
          var setupTouchstart = function(event) {
            allowUp = (scrollableContent.scrollTop > 0);

            allowDown = (scrollableContent.scrollTop < scrollableContent.scrollHeight - scrollableContent.clientHeight);
            lastY = getTouchY(event);
          };

          $element.on('touchstart', setupTouchstart);
          $element.on('$destroy', function() {
            $element.off('touchstart');
          });

          allowTouchmoveDefault($element, function(event) {
            var currY = getTouchY(event);
            var up = (currY > lastY);
            var down = !up;
            lastY = currY;
            return (up && allowUp) || (down && allowDown);
          });
        }

        this.scrollableContent = scrollableContent;

        this.scrollTo = function(elementOrNumber, marginTop) {
          marginTop = marginTop || 0;

          if (angular.isNumber(elementOrNumber)) {
            scrollableContent.scrollTop = elementOrNumber - marginTop;
          } else {
            var target = angular.element(elementOrNumber)[0];
            if ((!target.offsetParent) || target.offsetParent === scrollable) {
              scrollableContent.scrollTop = target.offsetTop - marginTop;
            } else {
              // recursively subtract offsetTop from marginTop until it reaches scrollable element.
              this.scrollTo(target.offsetParent, marginTop - target.offsetTop);
            }
          }
        };
      }],
      link: function(scope, element) {
        if (overthrow.support !== 'native') {
          element.addClass('overthrow');
          overthrow.forget();
          overthrow.set();
        }
      }
    };
  });

  angular.forEach(['input', 'textarea'], function(directiveName) {
    module.directive(directiveName, ['$rootScope', '$timeout', function($rootScope, $timeout) {
      return {
        require: '?^^scrollableContent',
        link: function(scope, elem, attrs, scrollable) {
          // Workaround to avoid soft keyboard hiding inputs
          elem.on('focus', function() {
            if (scrollable && scrollable.scrollableContent) {
              var h1 = scrollable.scrollableContent.offsetHeight;
              $timeout(function() {
                var h2 = scrollable.scrollableContent.offsetHeight;
                //
                // if scrollableContent height is reduced in half second
                // since an input got focus we assume soft keyboard is showing.
                //
                if (h1 > h2) {
                  var marginTop = 10;
                  // if scrollableHeader is present increase the marginTop to compensate for scrollableHeader's height.
                  var scrollableHeader = scrollable.scrollableContent.parentElement.querySelector('.scrollable-header');
                  if (scrollableHeader) {
                    marginTop = (scrollableHeader.getBoundingClientRect().bottom - scrollableHeader.getBoundingClientRect().top) + marginTop;
                  }
                  scrollable.scrollTo(elem, marginTop);
                }
              }, 500);
            }
          });
        }
      };
    }]);
  });

  /**
   * @directive uiScrollTop
   * @restrict A
   *
   * @param {expression} uiScrollTop The expression to be evaluated when scroll
   * reaches top of element.
   */

  /**
   * @directive uiScrollBottom
   * @restrict A
   *
   * @param {expression} uiScrollBottom The expression to be evaluated when scroll
   * reaches bottom of element.
   */
  angular.forEach(
    {
      uiScrollTop: function(elem) {
        return elem.scrollTop === 0;
      },
      uiScrollBottom: function(elem) {
        return elem.scrollHeight === elem.scrollTop + elem.clientHeight;
      }
    },
    function(reached, directiveName) {
      module.directive(directiveName, [function() {
        return {
          restrict: 'A',
          link: function(scope, elem, attrs) {
            elem.on('scroll', function() {
              /* If reached bottom */
              if (reached(elem[0])) {
                /* Do what is specified by onScrollBottom */
                scope.$apply(function() {
                  scope.$eval(attrs[directiveName]);
                });
              }
            });
          }
        };
      }]);
    });

  /**
   * @directive uiScrollableHeader
   * @restrict C
   */

  /**
   * @directive uiScrollableFooter
   * @restrict C
   */
  angular.forEach({Top: 'scrollableHeader', Bottom: 'scrollableFooter'},
    function(directiveName, side) {
      module.directive(directiveName, [
        '$window',
        function($window) {
          return {
            restrict: 'C',
            link: function(scope, element) {
              var el = element[0];
              var parentStyle = element.parent()[0].style;

              var adjustParentPadding = function() {
                var styles = $window.getComputedStyle(el);
                var margin = parseInt(styles.marginTop, 10) + parseInt(styles.marginBottom, 10);
                parentStyle['padding' + side] = el.offsetHeight + margin + 'px';
              };

              var interval = setInterval(adjustParentPadding, 30);

              element.on('$destroy', function() {
                parentStyle['padding' + side] = null;
                clearInterval(interval);
                interval = adjustParentPadding = element = null;
              });
            }
          };
        }
      ]);
    });
})();

/**
 * @module mobile-angular-ui.components.sidebars
 *
 * @description
 *
 * Sidebars can be placed either in left side or right side adding respectively
 * `.sidebar-left` and `.sidebar-right` classes.
 *
 * ``` html
 * <div class="sidebar sidebar-left">
 *   <div class="scrollable">
 *     <h1 class="scrollable-header app-name">My App</h1>
 *     <div class="scrollable-content">
 *       <div class="list-group" ui-turn-off='uiSidebarLeft'>
 *         <a class="list-group-item" href="#/link1">Link 1
 *           <i class="fa fa-chevron-right pull-right"></i></a>
 *         <a class="list-group-item" href="#/link2">Link 2
 *           <i class="fa fa-chevron-right pull-right"></i></a>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 *
 * <div class="sidebar sidebar-right">
 *   <!-- -->
 * </div>
 * ```
 *
 * #### Interacting with sidebars
 *
 * Under the hood sidebar uses `SharedState` exposing respective statuses:
 * `uiSidebarLeft` and `uiSidebarRight` unless you define different state name
 * through `id` attribute on sidebar elements.
 *
 * ``` html
 * <a href ui-toggle='uiSidebarLeft'>Toggle sidebar left</a>
 *
 * <a href ui-toggle='uiSidebarRight'>Toggle sidebar right</a>
 * ```
 *
 * You can put `ui-turn-off='uiSidebarLeft'` or `ui-turn-off='uiSidebarLeft'`
 * inside the sidebar to make it close after clicking links inside them.
 *
 * By default sidebar are closed by clicking/tapping outside them.
 */
(function() {
  'use strict';

  var module = angular.module(
    'mobile-angular-ui.components.sidebars', [
      'mobile-angular-ui.core.sharedState',
      'mobile-angular-ui.core.outerClick'
    ]
  );

  angular.forEach(['left', 'right'], function(side) {
    var directiveName = 'sidebar' + side.charAt(0).toUpperCase() + side.slice(1);
    var defaultStateName = 'ui' + directiveName.charAt(0).toUpperCase() + directiveName.slice(1);

    module.directive(directiveName, [
      '$rootElement',
      'SharedState',
      'bindOuterClick',
      '$location',
      function(
        $rootElement,
        SharedState,
        bindOuterClick,
        $location
      ) {
        return {
          restrict: 'C',
          link: function(scope, elem, attrs) {
            var parentClass = 'has-sidebar-' + side;
            var visibleClass = 'sidebar-' + side + '-visible';
            var activeClass = 'sidebar-' + side + '-in';
            var stateName = attrs.id ? attrs.id : defaultStateName;
            var trackAsSearchParam = attrs.uiTrackAsSearchParam === '' || attrs.uiTrackAsSearchParam;

            var outerClickCb = function() {
              SharedState.turnOff(stateName);
            };

            var outerClickIf = function() {
              return SharedState.isActive(stateName);
            };

            $rootElement.addClass(parentClass);
            scope.$on('$destroy', function() {
              $rootElement
                .removeClass(parentClass);
              $rootElement
                .removeClass(visibleClass);
              $rootElement
                .removeClass(activeClass);
            });

            var defaultActive = attrs.active !== undefined && attrs.active !== 'false';
            SharedState.initialize(scope, stateName, {defaultValue: defaultActive});

            scope.$on('mobile-angular-ui.state.changed.' + stateName, function(e, active) {
              if (trackAsSearchParam) {
                $location.search(stateName, active || null);
              }

              if (active) {
                $rootElement
                  .addClass(visibleClass);
                $rootElement
                  .addClass(activeClass);
              } else {
                $rootElement
                  .removeClass(activeClass);
                // Note: .removeClass(visibleClass) is called on 'mobile-angular-ui.app.transitionend'
              }
            });

            scope.$on('$routeChangeSuccess', function() {
              SharedState.turnOff(stateName);
            });

            scope.$on('$routeUpdate', function() {
              if (trackAsSearchParam) {
                if (($location.search())[stateName]) {
                  SharedState.turnOn(stateName);
                } else {
                  SharedState.turnOff(stateName);
                }
              }
            });

            scope.$on('mobile-angular-ui.app.transitionend', function() {
              if (!SharedState.isActive(stateName)) {
                $rootElement.removeClass(visibleClass);
              }
            });

            if (attrs.closeOnOuterClicks !== 'false') {
              bindOuterClick(scope, elem, outerClickCb, outerClickIf);
            }
          }
        };
      }
    ]);
  });

  module.directive('app', ['$rootScope', function($rootScope) {
    return {
      restrict: 'C',
      link: function(scope, element) {

        element.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', function() {
          $rootScope.$broadcast('mobile-angular-ui.app.transitionend');
        });

      }
    };
  }]);
})();

/**
 * A module with just a directive to create a switch input component.
 *
 * @module mobile-angular-ui.components.switch
 */
(function() {
  'use strict';
  angular.module('mobile-angular-ui.components.switch', [])

  /**
   * @directive uiSwitch
   * @restrict EA
   * @requires ngModel
   * @description
   *
   * The `ui-switch` directive (not to be confused with `ng-switch`) lets
   * you create a toggle switch control bound to a boolean `ngModel` value.
   *
   * <figure class="full-width-figure">
   *   <img src="/assets/img/figs/switch.png" alt=""/>
   * </figure>
   *
   * It requires `ngModel`. It supports `ngChange` and `ngDisabled`.
   *
   * ``` html
   * <ui-switch  ng-model="invoice.paid"></ui-switch>
   * ```
   *
   * ``` html
   * <ui-switch  ng-model="invoice.paid" disabled></ui-switch>
   * ```
   *
   * ``` html
   * <ui-switch  ng-model="invoice.paid" ng-disabled='{{...}}'></ui-switch>
   * ```
   *
   * Note that if `$drag` service from `mobile-angular-ui.gestures` is available
   * `ui-switch` will support drag too.
   *
   * @param {expression} ngModel The model bound to this component.
   * @param {boolean} [disabled] Whether this component should be disabled.
   * @param {expression} [ngChange] An expression to be evaluated when model changes.
   */
    .directive('uiSwitch', ['$injector', function($injector) {
      var $drag = $injector.has('$drag') && $injector.get('$drag');

      return {
        restrict: 'EA',
        scope: {
          model: '=ngModel',
          changeExpr: '@ngChange'
        },
        link: function(scope, elem, attrs) {
          elem.addClass('switch');

          var disabled = attrs.disabled || elem.attr('disabled');

          var unwatchDisabled = scope.$watch(
          function() {
            return attrs.disabled || elem.attr('disabled');
          },
          function(value) {
            if (!value || value === 'false' || value === '0') {
              disabled = false;
            } else {
              disabled = true;
            }
          }
        );

          var handle = angular.element('<div class="switch-handle"></div>');
          elem.append(handle);

          if (scope.model) {
            elem.addClass('active');
          }
          elem.addClass('switch-transition-enabled');

          var unwatch = scope.$watch('model', function(value) {
            if (value) {
              elem.addClass('active');
            } else {
              elem.removeClass('active');
            }
          });

          var setModel = function(value) {
            if (!disabled && (value !== scope.model)) {
              scope.model = value;
              scope.$apply();
              if (scope.changeExpr !== null && scope.changeExpr !== undefined) {
                scope.$parent.$eval(scope.changeExpr);
              }
            }
          };

          var clickCb = function() {
            setModel(!scope.model);
          };

          elem.on('click tap', clickCb);

          var unbind = angular.noop;

          if ($drag) {
            unbind = $drag.bind(handle, {
              transform: $drag.TRANSLATE_INSIDE(elem),
              start: function() {
                elem.off('click tap', clickCb);
              },
              cancel: function() {
                handle.removeAttr('style');
                elem.off('click tap', clickCb);
                elem.on('click tap', clickCb);
              },
              end: function() {
                var rh = handle[0].getBoundingClientRect();
                var re = elem[0].getBoundingClientRect();
                if (rh.left - re.left < rh.width / 3) {
                  setModel(false);
                  handle.removeAttr('style');
                } else if (re.right - rh.right < rh.width / 3) {
                  setModel(true);
                  handle.removeAttr('style');
                } else {
                  handle.removeAttr('style');
                }
                elem.on('click tap', clickCb);
              }
            });
          }

          elem.on('$destroy', function() {
            unbind();
            unwatchDisabled();
            unwatch();
            setModel = unbind = unwatch = unwatchDisabled = clickCb = null;
          });
        }
      };
    }]);
})();

/**
 * @module mobile-angular-ui.components
 *
 * @description
 *
 * It has directives and services providing mobile friendly
 * components like navbars and sidebars.
 * It requires `mobile-angular-ui.base.css`
 * in order to work properly.
 *
 * ## Standalone Usage
 *
 * Although `.components` module is required by `mobile-angular-ui` by default
 * you can use it alone. Some submodules requires `mobile-angular-ui.core` to work,
 * so be sure its sources are available.
 *
 * ``` js
 * angular.module('myApp', ['mobile-angular-ui.components']);
 * ```
 *
 */
(function() {
  'use strict';

  angular.module('mobile-angular-ui.components', [
    'mobile-angular-ui.components.modals',
    'mobile-angular-ui.components.navbars',
    'mobile-angular-ui.components.sidebars',
    'mobile-angular-ui.components.scrollable',
    'mobile-angular-ui.components.switch'
  ]);
})();

/**
 * @module mobile-angular-ui
 * @position 0
 * @description
 *
 * This is the main angular module of `mobile-angular-ui` framework.
 *
 * By requiring this module you will have all `mobile-angular-ui.core`
 * and `mobile-angular-ui.components` features required as well.
 *
 * ## Usage
 *
 * Declare it as a dependency for your application:
 *
 * ``` js
 * angular.module('myApp', ['mobile-angular-ui']);
 * ```
 */
(function() {
  'use strict';

  angular.module('mobile-angular-ui', [
    'mobile-angular-ui.core',
    'mobile-angular-ui.components'
  ]);

})();
;!function(){"use strict";angular.module("mobile-angular-ui.gestures.drag",["mobile-angular-ui.gestures.touch","mobile-angular-ui.gestures.transform"]).provider("$drag",function(){this.$get=["$touch","$transform",function(t,e){var n=document.createElement("style");n.appendChild(document.createTextNode("")),document.head.appendChild(n);var r=n.sheet;return r.insertRule("html .ui-drag-move{z-index: 99999 !important;}",0),r.insertRule("html .ui-drag-move{-webkit-transition: none !important;-moz-transition: none !important;-o-transition: none !important;-ms-transition: none !important;transition: none !important;}",0),r.insertRule("html .ui-drag-move, html .ui-drag-move *{-webkit-touch-callout: none !important;-webkit-user-select: none !important;-khtml-user-select: none !important;-moz-user-select: none !important;-ms-user-select: none !important;user-select: none !important;}",0),n=r=null,{NULL_TRANSFORM:function(t,e){return e},TRANSLATE_BOTH:function(t,e,n){return e.translateX=n.distanceX,e.translateY=n.distanceY,e},TRANSLATE_HORIZONTAL:function(t,e,n){return e.translateX=n.distanceX,e.translateY=0,e},TRANSLATE_UP:function(t,e,n){return e.translateY=n.distanceY<=0?n.distanceY:0,e.translateX=0,e},TRANSLATE_DOWN:function(t,e,n){return e.translateY=n.distanceY>=0?n.distanceY:0,e.translateX=0,e},TRANSLATE_LEFT:function(t,e,n){return e.translateX=n.distanceX<=0?n.distanceX:0,e.translateY=0,e},TRANSLATE_RIGHT:function(t,e,n){return e.translateX=n.distanceX>=0?n.distanceX:0,e.translateY=0,e},TRANSLATE_VERTICAL:function(t,e,n){return e.translateX=0,e.translateY=n.distanceY,e},TRANSLATE_INSIDE:function(t){return t=t.length?t[0]:t,function(e,n,r){e=e.length?e[0]:e;var a,o,i=e.getBoundingClientRect(),u=t instanceof Element?t.getBoundingClientRect():t;return a=i.width>=u.width?0:i.right+r.stepX>u.right?u.right-i.right:i.left+r.stepX<u.left?u.left-i.left:r.stepX,o=i.height>=u.height?0:i.bottom+r.stepY>u.bottom?u.bottom-i.bottom:i.top+r.stepY<u.top?u.top-i.top:r.stepY,n.translateX+=a,n.translateY+=o,n}},bind:function(n,r,a){n=angular.element(n),r=r||{},a=a||{};var o,i,u=r.start,s=r.end,c=r.move,l=r.cancel,f=r.transform||this.TRANSLATE_BOTH,m=n[0],v=e.get(n),d=m.getBoundingClientRect(),g=!1,h=function(){return g},p=function(){g=!1,o=i=null,n.removeClass("ui-drag-move")},X=function(){e.set(m,v)},Y=function(){e.set(m,o||v)},T=function(){g=!0,i=m.getBoundingClientRect(),o=e.get(m),n.addClass("ui-drag-move")},b=function(t){return t=angular.extend({},t),t.originalTransform=v,t.originalRect=d,t.startRect=i,t.rect=m.getBoundingClientRect(),t.startTransform=o,t.transform=e.get(m),t.reset=X,t.undo=Y,t},w=function(t,r){if(r.preventDefault(),h()){t=b(t);var a=f(n,angular.extend({},t.transform),t,r);e.set(m,a),c&&c(t,r)}else T(),u&&u(b(t),r)},R=function(t,e){h()&&(e.__UiSwipeHandled__=!0,t=b(t),p(),s&&s(t,e))},E=function(t,e){h()&&(t=b(t),Y(),p(),l&&l(t,e))};return t.bind(n,{move:w,end:R,cancel:E},a)}}}]})}(),function(){"use strict";var t=angular.module("mobile-angular-ui.gestures.swipe",["mobile-angular-ui.gestures.touch"]);t.factory("$swipe",["$touch",function(t){var e=500,n=10,r=10,a=10,o=Math.abs,i={movementThreshold:n,valid:function(t){var n=o(t.angle);n=n>=90?n-90:n;var i=t.total-t.distance<=r,u=a>=n||n>=90-a,s=t.averageVelocity>=e;return i&&u&&s}};return{bind:function(e,n,r){return r=angular.extend({},i,r||{}),t.bind(e,n,r)}}}]),angular.forEach(["ui","ng"],function(e){angular.forEach(["Left","Right"],function(n){var r=e+"Swipe"+n;t.directive(r,["$swipe","$parse",function(t,e){return{link:function(a,o,i){var u=e(i[r]);t.bind(o,{end:function(t,e){t.direction===n.toUpperCase()&&(e.__UiSwipeHandled__||(e.__UiSwipeHandled__=!0,a.$apply(function(){u(a,{$touch:t})})))}})}}}])})})}(),function(){"use strict";var t=angular.module("mobile-angular-ui.gestures.touch",[]);t.provider("$touch",function(){var t=function(){return!0},e=1,n={mouse:{start:"mousedown",move:"mousemove",end:"mouseup"},touch:{start:"touchstart",move:"touchmove",end:"touchend",cancel:"touchcancel"}},r=["mouse","touch"],a=function(t){return t[0].ownerDocument.documentElement.getBoundingClientRect()};this.setPointerEvents=function(t){n=t,r=Object.keys(n)},this.setValid=function(e){t=e},this.setMovementThreshold=function(t){e=t},this.setSensitiveArea=function(t){a=t};var o=Math.abs,i=Math.atan2,u=Math.sqrt,s=function(t){var e=t.touches&&t.touches.length?t.touches:[t],n=t.changedTouches&&t.changedTouches[0]||t.originalEvent&&t.originalEvent.changedTouches&&t.originalEvent.changedTouches[0]||e[0].originalEvent||e[0];return{x:n.clientX,y:n.clientY}},c=function(t,e){var r=[];return angular.forEach(t,function(t){var a=n[t][e];a&&r.push(a)}),r.join(" ")},l=function(){return new Date},f=function(t,e){return e=e||l(),o(e-t)},m=function(t,e){return u(t*t+e*e)},v=function(t,e,n,r){n=n||{},r=r||{};var a=l(),u=n.timestamp||a,s=r.timestamp||u,c=e.x,v=e.y,d=n.x||c,g=n.y||v,h=r.x||d,p=r.y||g,X=r.totalX||0,Y=r.totalY||0,T=X+o(c-h),b=Y+o(v-p),w=m(T,b),R=f(a,u),E=f(a,s),y=c-h,A=v-p,x=m(y,A),Z=c-d,_=v-g,k=m(Z,_),C=E>0?o(x/(E/1e3)):0,M=R>0?o(w/(R/1e3)):0,S=o(Z)>o(_)?0>Z?"LEFT":"RIGHT":0>_?"TOP":"BOTTOM",L=0!==Z||0!==_?i(_,Z)*(180/Math.PI):null;return L=-180===L?180:L,{type:t,timestamp:a,duration:R,startX:d,startY:g,prevX:h,prevY:p,x:e.x,y:e.y,step:x,stepX:y,stepY:A,velocity:C,averageVelocity:M,distance:k,distanceX:Z,distanceY:_,total:w,totalX:T,totalY:b,direction:S,angle:L}};this.$get=[function(){return{bind:function(n,o,i){n=angular.element(n),i=i||{};var u,l,f,m,d,g=i.pointerTypes||r,h=void 0===i.valid?t:i.valid,p=void 0===i.movementThreshold?e:i.movementThreshold,X=void 0===i.sensitiveArea?a:i.sensitiveArea,Y=c(g,"start"),T=c(g,"end"),b=c(g,"move"),w=c(g,"cancel"),R=o.start,E=o.end,y=o.move,A=o.cancel,x=angular.element(n[0].ownerDocument),Z=function(){u=l=null,x.off(b,f),x.off(T,m),w&&x.off(w,d)},_=function(){return Boolean(u)},k=function(t){t.touches&&t.touches.length>1||(l=u=v("touchstart",s(t)),x.on(b,f),x.on(T,m),w&&x.on(w,d),R&&R(u,t))};return d=function(t){var e=v("touchcancel",s(t),u,l);Z(),A&&A(e,t)},f=function(t){if(!(t.touches&&t.touches.length>1)&&_()){var e=s(t),r="function"==typeof X?X(n):X;r=r.length?r[0]:r;var a=r instanceof Element?r.getBoundingClientRect():r;if(!(e.x<a.left||e.x>a.right||e.y<a.top||e.y>a.bottom)){var o=v("touchmove",e,u,l),i=o.totalX,c=o.totalY;l=o,p>i&&p>c||h(o,t)&&((void 0===t.cancelable||t.cancelable)&&t.preventDefault(),y&&y(o,t))}}},m=function(t){if(!(t.touches&&t.touches.length>1)&&_()){var e=angular.extend({},l,{type:"touchend"});h(e,t)&&((void 0===t.cancelable||t.cancelable)&&t.preventDefault(),E&&setTimeout(function(){E(e,t)},0)),Z()}},n.on(Y,k),function(){n&&(n.off(Y,k),w&&x.off(w,d),x.off(b,f),x.off(T,m),n=x=Y=w=b=T=k=d=f=m=g=h=p=X=null)}}}}]})}(),function(){"use strict";var t=angular.module("mobile-angular-ui.gestures.transform",[]);t.factory("$transform",function(){for(var t,e,n,r=["","webkit","Moz","O","ms"],a=document.createElement("div"),o=0;o<r.length;o++){var i=r[o];if(i+"Perspective"in a.style){t=""===i?"":"-"+i.toLowerCase()+"-",n=i+(""===i?"transform":"Transform"),e=t+"transform";break}}a=null;var u=function(t){t=t.length?t[0]:t;var n=window.getComputedStyle(t,null).getPropertyValue(e);return n},s=function(t,e){t=t.length?t[0]:t,t.style[n]=e},c=1e-7,l=function(t){return 180*t/Math.PI},f=Math.sqrt,m=Math.asin,v=Math.atan2,d=Math.cos,g=Math.abs,h=Math.floor,p=function(t){for(var e=[[],[],[],[]],n=0;n<t.length;n++)for(var r=0;r<t[n].length;r++)e[n][r]=t[n][r];return e},X=function(t,e,n,r){return t*r-e*n},Y=function(t,e,n,r,a,o,i,u,s){return t*X(a,o,u,s)-r*X(e,n,u,s)+i*X(e,n,a,o)},T=function(t){var e=t[0][0],n=t[0][1],r=t[0][2],a=t[0][3],o=t[1][0],i=t[1][1],u=t[1][2],s=t[1][3],c=t[2][0],l=t[2][1],f=t[2][2],m=t[2][3],v=t[3][0],d=t[3][1],g=t[3][2],h=t[3][3];return e*Y(i,l,d,u,f,g,s,m,h)-n*Y(o,c,v,u,f,g,s,m,h)+r*Y(o,c,v,i,l,d,s,m,h)-a*Y(o,c,v,i,l,d,u,f,g)},b=function(t){var e=[[],[],[],[]],n=t[0][0],r=t[0][1],a=t[0][2],o=t[0][3],i=t[1][0],u=t[1][1],s=t[1][2],c=t[1][3],l=t[2][0],f=t[2][1],m=t[2][2],v=t[2][3],d=t[3][0],g=t[3][1],h=t[3][2],p=t[3][3];return e[0][0]=Y(u,f,g,s,m,h,c,v,p),e[1][0]=-Y(i,l,d,s,m,h,c,v,p),e[2][0]=Y(i,l,d,u,f,g,c,v,p),e[3][0]=-Y(i,l,d,u,f,g,s,m,h),e[0][1]=-Y(r,f,g,a,m,h,o,v,p),e[1][1]=Y(n,l,d,a,m,h,o,v,p),e[2][1]=-Y(n,l,d,r,f,g,o,v,p),e[3][1]=Y(n,l,d,r,f,g,a,m,h),e[0][2]=Y(r,u,g,a,s,h,o,c,p),e[1][2]=-Y(n,i,d,a,s,h,o,c,p),e[2][2]=Y(n,i,d,r,u,g,o,c,p),e[3][2]=-Y(n,i,d,r,u,g,a,s,h),e[0][3]=-Y(r,u,f,a,s,m,o,c,v),e[1][3]=Y(n,i,l,a,s,m,o,c,v),e[2][3]=-Y(n,i,l,r,u,f,o,c,v),e[3][3]=Y(n,i,l,r,u,f,a,s,m),e},w=function(t){var e=b(t),n=T(t);if(g(n)<c)return!1;for(var r=0;4>r;r++)for(var a=0;4>a;a++)e[r][a]/=n;return e},R=function(t){for(var e=[[],[],[],[]],n=0;4>n;n++)for(var r=0;4>r;r++)e[n][r]=t[r][n];return e},E=function(t,e){var n=[];return n[0]=t[0]*e[0][0]+t[1]*e[1][0]+t[2]*e[2][0]+t[3]*e[3][0],n[1]=t[0]*e[0][1]+t[1]*e[1][1]+t[2]*e[2][1]+t[3]*e[3][1],n[2]=t[0]*e[0][2]+t[1]*e[1][2]+t[2]*e[2][2]+t[3]*e[3][2],n[3]=t[0]*e[0][3]+t[1]*e[1][3]+t[2]*e[2][3]+t[3]*e[3][3],n},y=function(t){return f(t[0]*t[0]+t[1]*t[1]+t[2]*t[2])},A=function(t,e){var n=[],r=y(t);if(0!==r){var a=e/r;n[0]*=a,n[1]*=a,n[2]*=a}return n},x=function(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]},Z=function(t,e,n,r){var a=[];return a[0]=n*t[0]+r*e[0],a[1]=n*t[1]+r*e[1],a[2]=n*t[2]+r*e[2],a},_=function(t,e){var n=[];return n[0]=t[1]*e[2]-t[2]*e[1],n[1]=t[2]*e[0]-t[0]*e[2],n[2]=t[0]*e[1]-t[1]*e[0],n},k=function(t){var e,n,r={},a=p(t);if(0===a[3][3])return!1;for(e=0;4>e;e++)for(n=0;4>n;n++)a[e][n]/=a[3][3];var o=p(a);for(e=0;3>e;e++)o[e][3]=0;if(o[3][3]=1,0===T(o))return!1;if(0!==a[0][3]||0!==a[1][3]||0!==a[2][3]){var i=[];i[0]=a[0][3],i[1]=a[1][3],i[2]=a[2][3],i[3]=a[3][3];var u=w(o),s=R(u),c=E(i,s);r.perspectiveX=c[0],r.perspectiveY=c[1],r.perspectiveZ=c[2],r.perspectiveW=c[3],a[0][3]=a[1][3]=a[2][3]=0,a[3][3]=1}else r.perspectiveX=r.perspectiveY=r.perspectiveZ=0,r.perspectiveW=1;r.translateX=a[3][0],a[3][0]=0,r.translateY=a[3][1],a[3][1]=0,r.translateZ=a[3][2],a[3][2]=0;var f,g=[[],[],[]];for(e=0;3>e;e++)g[e][0]=a[e][0],g[e][1]=a[e][1],g[e][2]=a[e][2];if(r.scaleX=y(g[0]),A(g[0],1),r.skewXY=x(g[0],g[1]),Z(g[1],g[0],g[1],1,-r.skewXY),r.scaleY=y(g[1]),A(g[1],1),r.skewXY/=r.scaleY,r.skewXZ=x(g[0],g[2]),Z(g[2],g[0],g[2],1,-r.skewXZ),r.skewYZ=x(g[1],g[2]),Z(g[2],g[1],g[2],1,-r.skewYZ),r.scaleZ=y(g[2]),A(g[2],1),r.skewXZ/=r.scaleZ,r.skewYZ/=r.scaleZ,f=_(g[1],g[2]),x(g[0],f)<0)for(e=0;3>e;e++)r.scaleX*=-1,g[e][0]*=-1,g[e][1]*=-1,g[e][2]*=-1;return r.rotateY=l(m(-g[0][2]))||0,0===d(r.rotateY)?(r.rotateX=l(v(-g[2][0],g[1][1]))||0,r.rotateZ=0):(r.rotateX=l(v(g[1][2],g[2][2]))||0,r.rotateZ=l(v(g[0][1],g[0][0]))||0),r},C=function(t,e){var n=t||e||0;return String(n.toFixed(20))},M=function(t,e){return C(t,e)+"px"},S=function(t,e){return C(t,e)+"deg"};return{fromCssMatrix:function(t){var e=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];if(t&&"none"!==t){var n=t.split("(")[1].split(")")[0].split(",").map(Number);if(t.match(/^matrix\(/))e[0][0]=n[0],e[1][0]=n[1],e[0][1]=n[2],e[1][1]=n[3],e[3][0]=n[4],e[3][1]=n[5];else for(var r=0;16>r;r++){var a=h(r/4),o=r%4;e[a][o]=n[r]}}return k(e)},toCss:function(t){var e=[C(t.perspectiveX),C(t.perspectiveY),C(t.perspectiveZ),C(t.perspectiveW,1)],n=[M(t.translateX),M(t.translateY),M(t.translateZ)],r=[C(t.scaleX),C(t.scaleY),C(t.scaleZ)],a=[S(t.rotateX),S(t.rotateY),S(t.rotateZ)],o=[C(t.skewXY),C(t.skewXZ),C(t.skewYZ)];return["matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,"+e.join(",")+")","translate3d("+n.join(",")+")","rotateX("+a[0]+") rotateY("+a[1]+") rotateZ("+a[2]+")","matrix3d(1,0,0,0,0,1,0,0,0,"+o[2]+",1,0,0,0,0,1)","matrix3d(1,0,0,0,0,1,0,0,"+o[1]+",0,1,0,0,0,0,1)","matrix3d(1,0,0,0,"+o[0]+",1,0,0,0,0,1,0,0,0,0,1)","scale3d("+r.join(",")+")"].join(" ")},get:function(t){return this.fromCssMatrix(u(t))},set:function(t,e){var n="string"==typeof e?e:this.toCss(e);s(t,n)}}})}(),function(){"use strict";angular.module("mobile-angular-ui.gestures",["mobile-angular-ui.gestures.drag","mobile-angular-ui.gestures.swipe","mobile-angular-ui.gestures.transform"])}();
//# sourceMappingURL=mobile-angular-ui.gestures.min.js.map
;/*
 AngularJS v1.3.0-beta.14
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(n,e,A){'use strict';function x(s,g,k){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,b,c,f,w){function y(){p&&(p.remove(),p=null);h&&(h.$destroy(),h=null);l&&(k.leave(l,function(){p=null}),p=l,l=null)}function v(){var c=s.current&&s.current.locals;if(e.isDefined(c&&c.$template)){var c=a.$new(),d=s.current;l=w(c,function(d){k.enter(d,null,l||b,function(){!e.isDefined(t)||t&&!a.$eval(t)||g()});y()});h=d.scope=c;h.$emit("$viewContentLoaded");h.$eval(u)}else y()}
var h,l,p,t=c.autoscroll,u=c.onload||"";a.$on("$routeChangeSuccess",v);v()}}}function z(e,g,k){return{restrict:"ECA",priority:-400,link:function(a,b){var c=k.current,f=c.locals;b.html(f.$template);var w=e(b.contents());c.controller&&(f.$scope=a,f=g(c.controller,f),c.controllerAs&&(a[c.controllerAs]=f),b.data("$ngControllerController",f),b.children().data("$ngControllerController",f));w(a)}}}n=e.module("ngRoute",["ng"]).provider("$route",function(){function s(a,b){return e.extend(new (e.extend(function(){},
{prototype:a})),b)}function g(a,e){var c=e.caseInsensitiveMatch,f={originalPath:a,regexp:a},k=f.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(a,e,c,b){a="?"===b?b:null;b="*"===b?b:null;k.push({name:c,optional:!!a});e=e||"";return""+(a?"":e)+"(?:"+(a?e:"")+(b&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");f.regexp=RegExp("^"+a+"$",c?"i":"");return f}var k={};this.when=function(a,b){k[a]=e.extend({reloadOnSearch:!0},b,a&&g(a,b));if(a){var c=
"/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";k[c]=e.extend({redirectTo:a},g(c,b))}return this};this.otherwise=function(a){this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$http","$templateCache","$sce",function(a,b,c,f,g,n,v,h){function l(){var d=p(),m=r.current;if(d&&m&&d.$$route===m.$$route&&e.equals(d.pathParams,m.pathParams)&&!d.reloadOnSearch&&!u)m.params=d.params,e.copy(m.params,c),a.$broadcast("$routeUpdate",m);else if(d||m)u=!1,a.$broadcast("$routeChangeStart",
d,m),(r.current=d)&&d.redirectTo&&(e.isString(d.redirectTo)?b.path(t(d.redirectTo,d.params)).search(d.params).replace():b.url(d.redirectTo(d.pathParams,b.path(),b.search())).replace()),f.when(d).then(function(){if(d){var a=e.extend({},d.resolve),b,c;e.forEach(a,function(d,b){a[b]=e.isString(d)?g.get(d):g.invoke(d,null,null,b)});e.isDefined(b=d.template)?e.isFunction(b)&&(b=b(d.params)):e.isDefined(c=d.templateUrl)&&(e.isFunction(c)&&(c=c(d.params)),c=h.getTrustedResourceUrl(c),e.isDefined(c)&&(d.loadedTemplateUrl=
c,b=n.get(c,{cache:v}).then(function(a){return a.data})));e.isDefined(b)&&(a.$template=b);return f.all(a)}}).then(function(b){d==r.current&&(d&&(d.locals=b,e.copy(d.params,c)),a.$broadcast("$routeChangeSuccess",d,m))},function(b){d==r.current&&a.$broadcast("$routeChangeError",d,m,b)})}function p(){var a,c;e.forEach(k,function(f,k){var q;if(q=!c){var g=b.path();q=f.keys;var l={};if(f.regexp)if(g=f.regexp.exec(g)){for(var h=1,p=g.length;h<p;++h){var n=q[h-1],r="string"==typeof g[h]?decodeURIComponent(g[h]):
g[h];n&&r&&(l[n.name]=r)}q=l}else q=null;else q=null;q=a=q}q&&(c=s(f,{params:e.extend({},b.search(),a),pathParams:a}),c.$$route=f)});return c||k[null]&&s(k[null],{params:{},pathParams:{}})}function t(a,b){var c=[];e.forEach((a||"").split(":"),function(a,d){if(0===d)c.push(a);else{var e=a.match(/(\w+)(.*)/),f=e[1];c.push(b[f]);c.push(e[2]||"");delete b[f]}});return c.join("")}var u=!1,r={routes:k,reload:function(){u=!0;a.$evalAsync(l)}};a.$on("$locationChangeSuccess",l);return r}]});n.provider("$routeParams",
function(){this.$get=function(){return{}}});n.directive("ngView",x);n.directive("ngView",z);x.$inject=["$route","$anchorScroll","$animate"];z.$inject=["$compile","$controller","$route"]})(window,window.angular);
