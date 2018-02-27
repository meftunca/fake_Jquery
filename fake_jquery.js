{
    var $ = (params) => {
        let selectType, arr;
        if (typeof params === "string") {
            params = params.split(",").map(String);
            selectType = "str";
            arr = [];
        } else if (typeof params === "object") {
            selectType = "object";
            arr = params;
        } else {
            arr = [params];
            selectType = "object";
        }
        this.run = () => {
            if (selectType === "str") {
                Array.prototype.forEach.call(params, (el) => {
                    let element = document.querySelectorAll(el);
                    Array.prototype.forEach.call(element, (el) => {
                        return arr.push(el);
                    })
                });
            }
            return this;
        };
        this.run();
        this.call = (el, callback) => {
            if (selectType === "str") {
                Array.prototype.forEach.call(el, callback);
            } else {
                Array.prototype.forEach.call(el, callback);
            }
            return this;
        };
        this.on = (event, callback, fn = false) => {
            this.call(arr, (el) => {
                el.addEventListener(event, callback, fn);
            });
            return this;
        };
        this.off = (event, callback, fn = false) => {
            this.call(arr, (el) => {
                el.removeEventListener(event, callback, fn);
            });
            return this;
        };
        this.html = (text = null) => {
            this.call(arr, (el) => {
                if (text === null) {
                    return el.innerHTML;
                } else {
                    el.innerHTML = text;
                }
            });
            return this;
        };
        this.text = (text = null) => {
            this.call(arr, (el) => {
                if (text === null) {
                    return el.innerText;
                } else {
                    el.innerText = text;
                }
            });
            return this;
        };
        this.attr = (data, value) => {
            this.call(arr, (el) => {
                if (data && value) {
                    el.setAttribute(data, value);
                } else {
                    el.getAttribute(data);
                }
            });
            return this;
        };

        this.hasattr = (data) => {
            this.call(arr, (el) => {
                el.hasAttribute(data);
            });
            return this;
        };
        this.removeattr = (data) => {
            this.call(arr, (el) => {
                el.removeAttribute(data);
            });
            return this;
        };
        this.data = (data, value) => {
            this.call(arr, (el) => {
                if (data && value) {
                    el.dataset[data.replace(/[A_Z]/g, '-$&').toLocaleLowerCase()] = value;
                } else {
                    return el.dataset[data.replace(/[A_Z]/g, '-$&').toLocaleLowerCase()];
                }
            });
            return this;
        };
        this.hasdata = (data) => {
            this.call(arr, (el) => {
                return el.dataset[data.replace(/[A_Z]/g, '-$&').toLocaleLowerCase()] !== undefined ? true : false;
            });
            return this;
        };
        this.removedata = (data) => {
            this.call(arr, (el) => {
                el.removeAttribute("data-" + data);
            });
            return this;
        };
        this.index = () => {
            let index;
            this.call(arr, (el) => {
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
            this.call(arr, (el) => {
                clones = el.cloneNode(true);
            });
            return clones || this;
        };
        this.parent = () => {
            this.call(arr, (el) => {
                arr = [el.parentNode];
            });
            return this;
        };
        this.closest = (par) => {
            this.call(arr, (el) => {
                arr = [];
                arr = [el.closest(par)];
            });
            return this;

        };
        this.siblings = (selector) => {
            let item = [];
            item = arr.parentNode.querySelectorAll(selector);
            arr = [];
            this.call(item, function (wr) {
                arr.push(wr);
            });
            return this;
        };
        this.append = (tag, item) => {
            this.call(arr, (el) => {
                let tager = document.createElement(tag);
                tager.innerHTML = item;
                el.append(tager);
            });
            return this;
        };
        this.after = (params) => {
            this.call(arr, (el) => {
                let html = el.innerHTML;
                el.innerHTML = html + " " + params;
            });
            return this;
        };
        this.before = (params) => {
            this.call(arr, (el) => {
                let html = el.innerHTML;
                el.innerHTML = params + " " + html;
            });
            return this;
        };
        this.appendto = (tag) => {
            let to = document.querySelector(tag);
            this.call(arr, (el) => {
                to.append(el);
            });
            return this;
        };
        this.prependto = (tag) => {
            let to = document.querySelector(tag);
            this.call(arr, (el) => {
                to.prepend(el);
            });
            return this;
        };
        this.find = (find_item) => {
            this.call(arr, (el) => {
                let item = el.querySelectorAll(find_item);
                arr = [];
                this.call(item, function (finds) {
                    arr.push(finds);
                });
            });
            return this;
        };
        this.prepend = (tag, item) => {
            this.call(arr, (el) => {
                let tager = document.createElement(tag);
                tager.innerHTML = item;
                el.prepend(tager);
            });
            return this;
        };
        this.remove = (item) => {
            this.call(arr, (el) => {
                el.remove();
            });
            return this;
        };
        this.width = (par = null) => {
            let result;
            this.call(arr, (el) => {
                if (par === null) {
                    result = el.offsetWidth;
                } else {
                    el.style.width = par;
                    result = el.style.width;
                }
            });
            return result;
        };
        this.height = (par = null) => {
            let result;
            this.call(arr, (el) => {
                if (par === null) {
                    result = el.offsetHeight;
                } else {
                    el.style.height = par;
                    result = el.style.height;
                }
            });
            return result;
        };
        this.info = () => {
            return this.call(arr, (el) => {
                return window.getComputedStyle(el)
            });
            return this;
        }
        this.css = (par) => {
            this.call(arr, (el) => {
                el.style.cssText = par;
            });
            return this;
        };
        this.style = (par) => {
            let result;
            this.call(arr, (el) => {
                result = window.getComputedStyle(el)[par];
            });
            return result;
        };
        this.offsetLeft = (par) => {
            let result;
            this.call(arr, (el) => {
                result = el.offsetLeft;
            });
            return result;
        };
        this.offsetTop = (par) => {
            let result;
            this.call(arr, (el) => {
                result = el.offsetTop;
            });
            return result;
        };
        this.children = (par) => {
            this.call(arr, (el) => {
                el.children;
            });
            return this;
        };
        this.prev = () => {
            this.call(arr, (el) => {
                el.previousSibling;
            });
            return this;
        };
        this.next = () => {
            let sibling;
            this.call(arr, (el) => {
                el.nextElementSibling;
            });
            return this;
        };
        this.addclass = (className) => {
            let classes = className.split(" ").map(String);
            this.call(arr, (el) => {
                let cl = el.classList;
                for (dot of classes) {
                    if (cl.contains(dot)) {
                        return false;
                    } else {
                        el.classList.add(dot);
                    }
                }
            });
            return this;
        };
        this.removeclass = (className) => {
            let classes = className.split(" ").map(String);
            this.call(arr, (el) => {
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
        this.toggleclass = (className) => {
            let classes = className.split(" ").map(String);
            this.call(arr, (el) => {
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
        this.hasclass = (className) => {
            let classes = className.split(" ").map(String),
                contain;
            this.call(arr, (el) => {
                let cl = el.classList;
                for (dot of classes) {
                    contain = cl.contains(dot);
                }
            });
            return contain || this;
        }
        this.animate = (keyframes = [], options = {}) => {
            this.call(arr, (el) => {
                el.animate(keyframes, options);
            });
            return this;
        };
        this.hide = () => {
            this.call(arr, (el) => {
                el.style.display = "none";
            });
            return this;
        };
        this.show = () => {
            this.call(arr, (el) => {
                el.style.display = "block";
            });
            return this;
        };
        this.Toggle = (delay) => {
            if (window.getComputedStyle(el) === "none" || el.style.display === "none") {
                this.show(delay);
            } else {
                this.hide(delay);
            }
            return this;
        };
        this.fadeout = (duration) => {
            this.call(arr, (el) => {
                if (!duration) {
                    duration = 400;
                }
                el.animate([
                    {opacity: 1},
                    {opacity: 0},
                ], {
                    duration: duration
                });
            });
            return this;
        };
        this.fadeIn = (duration) => {
            this.call(arr, (el) => {
                if (!duration) {
                    duration = 400;
                }
                el.animate([
                    {opacity: 0},
                    {opacity: 1},
                ], {
                    duration: duration
                });
            });
            return this;
        };
        this.fadeToggle = (delay) => {
            this.call(arr, (el) => {
                if (window.getComputedStyle(el).opacity > 0) {
                    this.fadeOut(delay);
                } else {
                    this.fadeIn(delay);
                }
            });
            return this;
        };

        this.slideUp = (delay) => {
            el.style.cssText = "display:block;overflow:hidden";
            let padT = Number(window.getComputedStyle(el).paddingBottom.replace("px", "")),
                padB = Number(window.getComputedStyle(el).paddingTop.replace("px", "")),
                heightDefault = Number(window.getComputedStyle(el).height.replace("px", "")),
                itemStyle = el.style;
            this.call(arr, (el) => {
                if (!delay) {
                    delay = 400;
                }
                el.dataset.slide = "up";
                el.animate([
                    // keyframes
                    {height: heightDefault + 'px', paddingTop: padT + 'px', paddingBottom: padB + 'px'},
                    {height: 0, paddingTop: 0, paddingBottom: 0}
                ], {
                    // timing options
                    duration: delay,
                    easing: "cubic-bezier(0.42, 0, 0.58, 1)",
                    fill: 'backwards'
                    //iterations: Infinity
                });
                let timeout = setTimeout(() => {
                    itemStyle.display = "none";
                    window.clearTimeout(timeout);
                }, delay);
            });
            return this;
        };
        this.slideDown = (delay) => {
            el.style.cssText = "display:block;overflow:hidden";
            let padT = Number(window.getComputedStyle(el).paddingBottom.replace("px", "")),
                padB = Number(window.getComputedStyle(el).paddingTop.replace("px", "")),
                heightDefault = Number(window.getComputedStyle(el).height.replace("px", "")),
                itemStyle = el.style;
            this.call(arr, (el) => {
                if (!delay) {
                    delay = 400;
                }
                this.effect = false;
                el.dataset.slide = "down";
                el.animate([
                    // keyframes
                    {height: 0, paddingTop: 0, paddingBottom: 0},
                    {height: heightDefault + 'px', paddingTop: padT + 'px', paddingBottom: padB + 'px'},], {
                    // timing options
                    duration: delay,
                    easing: "cubic-bezier(0.42, 0, 0.58, 1)",
                    fill: 'forwards'
                    //iterations: Infinity
                });
            });
            return this;
        };
        this.slideToggle = (delay) => {

            this.call(arr, (el) => {
                if (el.dataset.slide === "up" || el.hasAttribute("data-slide") === false) {
                    this.slideDown(delay);
                } else if (el.dataset.slide === "down") {
                    this.slideUp(delay);
                }
            });
            return this;
        };

        return this;
    }
}
