{
    var $ = {};
    var $ = (params) => {
        let selectType, arr;
        if (typeof params === "string") {
            params = params.split(",").map(String);
            selectType = "str";
            arr = [];
        } else {
            arr = [params];
            selectType = "object";
        }
        this.run = () => {
            if (selectType === "str") {
                Array.prototype.forEach.call(params, el => {
                    let element = document.querySelectorAll(el);
                    Array.prototype.forEach.call(element, el => {
                        return arr.push(el);
                    })
                });
            } else {
                return arr;
            }
            return this;
        };
        this.run();
        this.call = (el, callback) => {
            Array.prototype.forEach.call(el, callback);
            return this;
        };
        this.on = (event, callback, fn = false) => {
            this.call(arr, el => {
                return el.addEventListener(event, callback, fn);
            });
            return this;
        };
        this.off = (event, callback, fn = false) => {
            this.call(arr, el => {
                el.removeEventListener(event, callback, fn);
            });
            return this;
        };
        this.html = (text = null) => {
            this.call(arr, el => {
                if (text === null) {
                    return el.innerHTML;
                } else {
                    el.innerHTML = text;
                }
            });
            return this;
        };
        this.text = (text = null) => {
            this.call(arr, el => {
                if (text === null) {
                    return el.innerText;
                } else {
                    el.innerText = text;
                }
            });
            return this;
        };
        this.attr = (data, value, prefix = null) => {
            prefix = prefix !== null ? prefix + "-" : "";
            this.call(arr, el => {
                if (data && value) {
                    el.setAttribute(prefix + data, value);
                } else {
                    el.getAttribute(prefix + data);
                }
            });
            return this;
        };

        this.hasAttr = (data, prefix = null) => {
            prefix = prefix !== null ? prefix + "-" : "";
            this.call(arr, el => {
                el.hasAttribute(data);
            });
            return this;
        };
        this.removeAttr = (data, prefix = null) => {
            prefix = prefix !== null ? prefix + "-" : "";
            this.call(arr, el => {
                el.removeAttribute(prefix + data);
            });
            return this;
        };
        this.data = (data, value) => {
            this.call(arr, el => {
                if (data && value) {
                    el.dataset[data.replace(/[A_Z]/g, '-$&').toLocaleLowerCase()] = value;
                } else {
                    return el.dataset[data.replace(/[A_Z]/g, '-$&').toLocaleLowerCase()];
                }
            });
            return this;
        };
        this.hasData = (data) => {
            this.call(arr, el => {
                return el.dataset[data.replace(/[A_Z]/g, '-$&').toLocaleLowerCase()] !== undefined ? true : false;
            });
            return this;
        };
        this.removeData = (data) => {
            this.call(arr, el => {
                el.removeAttribute("data-" + data);
            });
            return this;
        };
        this.index = () => {
            let index;
            this.call(arr, el => {
                let i = el.parentNode.children.length;
                for (let w = 0; w < i; w++) {
                    el.parentNode.children[0].setAttribute("tabindex", w - 1);
                }
                index = el.getAttribute("tabindex");
            });
            return index;
        };
        this.clone = () => {
            let clones;
            this.call(arr, el => {
                clones = el.cloneNode(true);
            });
            return clones || this;
        };
        this.parent = () => {
            this.call(arr, el => {
                arr = [el.parentNode];
            });
            return this;
        };
        this.closest = (par) => {
            this.call(arr, el => {
                arr = [el.closest(par)];
            });
            return this;

        };
        this.siblings = (selector) => {
            let item = [];
            this.call(arr, el => {
                item = el.parentNode.querySelectorAll(selector);
                arr = [];
                this.call(item, function (wr) {
                    arr.push(wr);
                });
            });

            return this;
        };
        this.append = (tag, item) => {
            this.call(arr, el => {
                let tager = document.createElement(tag);
                tager.innerHTML = item;
                el.append(tager);
            });
            return this;
        };
        this.after = (params) => {
            this.call(arr, el => {
                let html = el.innerHTML;
                el.innerHTML = html + " " + params;
            });
            return this;
        };
        this.before = (params) => {
            this.call(arr, el => {
                let html = el.innerHTML;
                el.innerHTML = params + " " + html;
            });
            return this;
        };
        this.appendTo = (tag) => {
            let to = document.querySelector(tag);
            this.call(arr, el => {
                to.append(el);
            });
            return this;
        };
        this.prependTo = (tag) => {
            let to = document.querySelector(tag);
            this.call(arr, el => {
                to.prepend(el);
            });
            return this;
        };
        this.find = (find_item) => {
            this.call(arr, el => {
                let item = el.querySelectorAll(find_item);
                arr = [];
                this.call(item, function (finds) {
                    arr.push(finds);
                });
            });
            return this;
        };
        this.prepend = (tag, item) => {
            this.call(arr, el => {
                let tager = document.createElement(tag);
                tager.innerHTML = item;
                el.prepend(tager);
            });
            return this;
        };
        this.remove = (item) => {
            this.call(arr, el => {
                el.remove();
            });
            return this;
        };
        this.helper = () => {
            this.call(arr, item => {
                this.box = {
                    left: (item.offsetLeft + window.screenLeft),
                    top: (item.offsetTop + window.screenTop),
                    right: (document.body.clientWidth - (item.offsetLeft + window.screenLeft)),
                    bottom: (document.body.clientHeight - (item.offsetTop + window.screenTop)),
                    height: item.clientHeight !== void 0 ? item.clientHeight : item.innerHeight,
                    width: item.clientWidth !== void 0 ? item.clientWidth : item.innerWidth
                };
            });
            return this;
        };
        this.children = (par) => {
            this.call(arr, el => {
                return el.children;
            });
            return this;
        };
        this.prev = () => {
            this.call(arr, el => {
                return el.previousSibling;
            });
            return this;
        };
        this.next = () => {
            let sibling;
            this.call(arr, el => {
                return el.nextElementSibling;
            });
            return this;
        };
        this.addClass = (className) => {
            let classes = className.split(" ").map(String);
            this.call(arr, el => {
                let cl = el.classList;
                for (dot of classes) {
                    if (cl.contains(dot)) {
                        return false;
                    } else {
                        return el.classList.add(dot);
                    }
                }
            });
            return this;
        };
        this.removeClass = (className) => {
            let classes = className.split(" ").map(String);
            this.call(arr, el => {
                let cl = el.classList;
                for (dot of classes) {
                    if (!cl.contains(dot)) {
                        return false;
                    } else {
                        el.classList.remove(dot);
                    }
                }
            });
            return this;
        };
        this.toggleClass = (className) => {
            let classes = className.split(" ").map(String);
            this.call(arr, el => {
                let cl = el.classList;
                for (dot of classes) {
                    if (!cl.contains(dot)) {
                        el.classList.add(dot);
                    } else {
                        el.classList.remove(dot);
                    }
                }
            });
            return this;
        };
        this.setStyle = cssText => {
            this.call(arr, el => {
                el.style.cssText = cssText;
            });
        };

        this.getStyle = (cssProp) => {
            return this.call(arr, item => {
                return item.style[cssProp];
            });
        };
        this.hasClass = (className) => {
            let classes = className.split(" ").map(String),
                contain;
            this.call(arr, el => {
                let cl = el.classList;
                for (dot of classes) {
                    contain = cl.contains(dot);
                }
            });
            return contain || this;
        };
        this.animate = (keyframes = [], options = {}, callback = null) => {
            this.call(arr, el => {
                let animation = el.animate(keyframes, options);
                animation.onanimationend = () => {
                    return callback
                };
            });
            return this;
        };
        this.hide = () => {
            this.call(arr, el => {
                el.style.display = "none";
            });
            return this;
        };
        this.show = () => {
            this.call(arr, el => {
                el.style.display = "block";
            });
            return this;
        };
        this.toggle = (delay) => {
            this.call(arr, el => {
                if (window.getComputedStyle(el)["display"] === "none" || el.style.display === "none") {
                    this.show(delay);
                } else {
                    this.hide(delay);
                }
            });
            return this;
        };
        this.fadeOut = (duration = 400, callback = null) => {
            this.call(arr, el => {
                el.style.display = "block";
                let animation = el.animate([
                    {opacity: 1},
                    {opacity: 0},
                ], {
                    duration: duration
                });
                animation.addEventListener("finish", () => {
                   el.style.display = "none";
                    return callback
                });
            });
            return this;
        };
        this.fadeIn = (duration = 400, callback = null) => {
            this.call(arr, el => {
                el.style.display = "block";
                let animation = el.animate([
                    {opacity: 0},
                    {opacity: 1},
                ], {
                    duration: duration
                });
                animation.addEventListener("finish", () => {
                    return callback
                });
            });
            return this;
        };
        this.fadeToggle = (duration = 400, callback = null) => {
            this.call(arr, el => {
                if (window.getComputedStyle(el).opacity > 0 && window.getComputedStyle(el).display !== "none") {
                    this.fadeOut(duration, callback = null);
                } else {
                    this.fadeIn(duration, callback = null);
                }
            });
            return this;
        };

        this.slideUp = (delay = 400, callback = null) => {
            this.call(arr, el => {
                let old_style = el.style.cssText;
                el.style.cssText = "display:block;overflow:hidden";
                let padT = Number(window.getComputedStyle(el).paddingBottom.replace("px", "")),
                    padB = Number(window.getComputedStyle(el).paddingTop.replace("px", "")),
                    heightDefault = Number(window.getComputedStyle(el).height.replace("px", ""));
                el.dataset.slideEffect = "up";
                let animation = el.animate([
                    {height: heightDefault + 'px', paddingTop: padT + 'px', paddingBottom: padB + 'px'},
                    {height: 0, paddingTop: 0, paddingBottom: 0}
                ], {
                    duration: delay,
                    easing: "cubic-bezier(0.12, 0, 0.58, 1)",
                });

                animation.addEventListener("finish", () => {
                    el.style.cssText = old_style;
                    el.style.display = "none";
                    return callback;
                });
            });
            return this;
        };
        this.slideDown = (delay = 400, callback = null) => {
            this.call(arr, el => {
                let old_style = el.style.cssText;
                el.style.cssText = "display:block;overflow:hidden";
                let padT = Number(window.getComputedStyle(el).paddingBottom.replace("px", "")),
                    padB = Number(window.getComputedStyle(el).paddingTop.replace("px", "")),
                    heightDefault = Number(window.getComputedStyle(el).height.replace("px", ""));
                el.dataset.slideEffect = "down";
                let animation = el.animate([
                    {height: 0, paddingTop: 0, paddingBottom: 0},
                    {height: heightDefault + 'px', paddingTop: padT + 'px', paddingBottom: padB + 'px'},], {
                    duration: delay,
                    easing: "cubic-bezier(0.12, 0, 0.58, 1)",
                });

                animation.addEventListener("finish", () => {
                    el.style.cssText = old_style;
                    el.style.display = "block";
                    el.style.overflow = "hidden";
                    return callback;
                });
            });
            return this;
        };
        this.slideToggle = (delay = 400, callback = null) => {
            this.call(arr, el => {
                if (el.dataset.slideEffect === "up" || window.getComputedStyle(el)["display"] === "none") {
                    this.slideDown(delay, callback = null);
                } else if (el.dataset.slideEffect === "down" || window.getComputedStyle(el)["display"] !== "none") {
                    this.slideUp(delay, callback = null);
                }
            });
            return this;
        };
        // extends function
        this.creator = (funcName, func) => {
            return $[funcName] = func;
        };
        return this;
    };
}
