{
  var $ = (params) => {
    let selectType;
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
          var element = document.querySelectorAll(el);
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
        if (text == null) {
          el.innerHTML;
        } else {
          el.innerHTML = text;
        }
      });
      return this;
    };
    this.text = (text = null) => {
      this.call(arr, (el) => {
        if (text == null) {
          el.innerText;
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
    }
    this.removeattr = (data) => {
      this.call(arr, (el) => {
        el.removeAttribute(data);
      });
      return this;
    };
    this.data = (data, value) => {
      this.call(arr, (el) => {
        if (data && value) {
          el.setAttribute("data-" + data, value);
        } else {
          el.getAttribute("data-" + data);
        }
      });
      return this;
    };
    this.hasdata = (data) => {
      this.call(arr, (el) => {
        el.hasAttribute("data-" + data);
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
      this.call(arr, (el) => {
        item = el.parentNode.querySelectorAll(selector);
        arr = [];
        this.call(item, function(wr) {
          arr.push(wr);
        });
        return item || this;
      });
      return this;
    };
    this.append = (tag, item) => {
      this.call(arr, (el) => {
        var tager = document.createElement(tag);
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
    }
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
        this.call(item, function(finds) {
          arr.push(finds);
        });
      });
      return this;
    };
    this.prepend = (tag, item) => {
      this.call(arr, (el) => {
        var tager = document.createElement(tag);
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
    this.toggle = (delay) => {
      if (window.getComputedStyle(el) === "none" || el.style.display === "none") {
        this.show(delay);
      } else {
        this.hide(delay);
      }
      return this;
    };
    this.fadeout = (delay) => {
      this.call(arr, (el) => {
        if (!delay) {
          delay = 400;
        }
        var h;
        if (!window.getComputedStyle(el).opacity) {
          h = 1;
        } else {
          h = window.getComputedStyle(el).opacity;
        }
        var effect = setInterval(() => {
          if (h < 0.1) {
            el.style.opacity = 0;
            window.clearInterval(effect);
          } else {
            h -= 0.1;
            el.style.opacity = h;
          }
        }, delay / 7);
      });
      return this;
    };
    this.fadein = (delay) => {
      this.call(arr, (el) => {
        if (!delay) {
          delay = 400;
        }
        var h = 0;
        el.style.opacity = 0;
        var effect = setInterval(() => {
          h += 0.1;
          if (h > 1) {
            window.clearInterval(effect)
          } else {
            el.style.opacity = h;
          }
        }, delay / 7);
      });
      return this;
    };
    this.fadetoggle = (delay) => {
      this.call(arr, (el) => {
        if (window.getComputedStyle(el).opacity > 0) {
          this.out(delay);
        } else {
          this. in (delay);
        }
      });
      return this;
    };
    this.setup = (delay) => {
      this.call(arr, (el) => {
        var hg = el.offsetHeight;
        return el.style.cssText = "box-sizing:border-box;display:block;overflow:hidden; transition: transform 0.4s cubic-bezier(0, 1, 0.5, 1);";
      });
      return this;

    };
    this.slideup = (delay) => {
      this.call(arr, (el) => {
        if (!delay) {
          delay = 400;
        }
        this.setup(delay, el);
        var padT = Number(window.getComputedStyle(el).paddingBottom.replace("px", ""));
        var padB = Number(window.getComputedStyle(el).paddingTop.replace("px", ""));
        var pad = padT + padB;
        var hg = el.offsetHeight - pad;
        var s = el.style;
        el.setAttribute("data-slide", "up");
        var effect = setInterval(() => {
          hg -= parseFloat(hg / delay) * 3;
          s.height = hg + "px";
          if (hg < 50) {
            hg -= parseFloat(hg / delay) * 5;
          }
          if (hg <= pad) {
            s.paddingTop = 0;
            s.paddingBottom = 0;
            s.color = "transparent";
          }
          if (hg < 2) {
            s.height = 0;
            window.clearInterval(effect);
            setTimeout(() => {
              s.borderWidth = "0";
              setTimeout(() => {
                s.cssText = "overflow:hidden";
                s.display = "none";
              }, 1)
            }, 1)
          }
        }, "fast");
      });
      return this;
    };
    this.slidedown = (delay) => {
      this.call(arr, (el) => {
        if (!delay) {
          delay = 400;
        }
        this.effect = false;
        this.setup(delay);
        var padT = Number(window.getComputedStyle(el).paddingBottom.replace("px", ""));
        var padB = Number(window.getComputedStyle(el).paddingTop.replace("px", ""));
        var hg = Number(window.getComputedStyle(el).height.replace("px", "")),
          h = 0;
        var pad = padT + padB;
        var s = el.style;
        s.height = 0;
        s.paddingTop = 0;
        s.paddingBottom = 0;
        s.color = "transparent";
        el.setAttribute("data-slide", "down");
        var effect = setInterval(() => {
          h += parseFloat(hg / delay) * 2;
          s.height = h + "px";
          if (h > pad) {
            s.color = "";
            s.paddingTop = "";
            s.paddingBottom = "";
          }
          if (h >= hg) {
            window.clearInterval(effect);
            setTimeout(() => {
              s.cssText = "overflow:hidden";
              s.display = "block";
            }, 1)
          }
        }, "fast")
      });
      return this;
    };
    this.slidetoggle = (delay) => {
      this.call(arr, (el) => {
        this.setup(delay, el);
        if (el.getAttribute("data-slide") == "up" || el.hasAttribute("data-slide") == false) {
          this.slidedown(delay);
        } else if (el.getAttribute("data-slide") == "down") {
          this.slideup(delay);
        }
      });
      return this;
    };
    this.fadetoggle = (delay) => {
      this.call(arr, (el) => {
        if (window.getComputedStyle(el).opacity > 0) {
          this.fadeout(delay);
        } else {
          this.fadein(delay);
        };
      });

      return this;
    };
    return this;

  }
}
