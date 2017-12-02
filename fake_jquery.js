{


    var $ = (params) => {
        params = params.split(",").map(String);
        arr = [];
        this.run = () => {
            Array.prototype.forEach.call(params, function (el) {
                var element = document.querySelectorAll(el);
                Array.prototype.forEach.call(element, function (el) {

                    return arr.push(el);
                })
            });

            return this;
        }
        this.run()
        this.call = (el, callback) => {
            Array.prototype.forEach.call(el, callback);
        }
        this.on = function (event, callback, fn = false) {
            this.call(arr, function (el) {
                 el.addEventListener(event, callback, fn);
            });

            return this;
        }
        this.html = (text = null) => {
            this.call(arr, function (el) {
                if (text == null) {
                    el.innerHTML;
                } else {
                    el.innerHTML = text;
                }
            });
            return this;
        }
        this.text = (text = null) => {
            this.call(arr, function (el) {
                if (text == null) {
                    el.innerText;
                } else {
                    el.innerText = text;
                }
            });
            return this;
        }
        this.attr = (data,value) => {
             this.call(arr, function (el) {
                 console.log(el);
                  if(data && value) {
                    el.setAttribute(data,value);
                }else{
                      el.getAttribute(data);
                }
             });
            return this;
        }

        this.data = (data, value) => {
            this.call(arr, function (el) {
                console.log(el);
                if (data && value) {
                    el.setAttribute("data-"+data, value);
                } else {
                    el.getAttribute("data-" +data);
                }
            });
            return this;
        }
        this.hide = () => {
            this.call(arr, function (el) {
                el.style.display = "none";
            });
        }
        this.show = () => {
            this.call(arr, function (el) {
                el.style.display = "block";
            });
        }
        this.toggle = function (delay) {
            if (window.getComputedStyle(el) === "none" || el.style.display === "none") {
                this.show(delay);
            } else {
                this.hide(delay);
            }
            return this;
        };
        this.fadeout = function (delay) {
            this.call(arr, function (el) {
                if (!delay) {
                    delay = 400;
                }
                var h;
                if (!window.getComputedStyle(el).opacity) {
                    h = 1;
                } else {
                    h = window.getComputedStyle(el).opacity;
                }
                var effect = setInterval(function () {
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
        this.fadein = function (delay) {
            this.call(arr, function (el) {
                if (!delay) {
                    delay = 400;
                }
                var h = 0;
                el.style.opacity = 0;
                var effect = setInterval(function () {
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

        this.setup = function (delay) {
            this.call(arr, function (el) {
            var hg = el.offsetHeight;
            return el.style.cssText =
                "box-sizing:border-box;display:block;overflow:hidden; transition: transform 0.4s cubic-bezier(0, 1, 0.5, 1);";
        });
        return this;

        };
        this.slideup = function (delay) {
            this.call(arr, function (el) {
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
                    var effect = setInterval(function () {
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
                            setTimeout(function () {
                                s.borderWidth = "0";
                                setTimeout(function () {
                                    s.cssText = "";
                                    s.display = "none";
                                }, 1)
                            }, 1)
                        }
                    }, "fast");
                });
           return this;
                
            };
            this.slidedown = function (delay) {
                this.call(arr, function (el) {
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

                var effect = setInterval(function () {
                    h += parseFloat(hg / delay) * 2;
                    s.height = h + "px";
                    if (h > pad) {
                        s.color = "";
                        s.paddingTop = "";
                        s.paddingBottom = "";
                    }
                    if (h >= hg) {
                        window.clearInterval(effect);
                        setTimeout(function () {
                            s.cssText = "";
                            s.display = "block";
                        }, 1)
                    }
                }, "fast")
            });
                return this;

            };
            this.slidetoggle = function (delay) {
                this.call(arr, function (el) {
                 this.setup(delay, el);
                if (el.getAttribute("data-slide") == "up" || el.hasAttribute("data-slide") == false) {
                    this.slidedown(delay);
                } else if (el.getAttribute("data-slide") == "down") {
                    this.slideup(delay);
                }
            });
                return this;
            };

            this.fadetoggle = function (delay) {
                if (window.getComputedStyle(el).opacity > 0) {
                    this.fadeout(delay);
                } else {
                    this.fadein(delay);
                };

                return this;
            };

            return this;

        }



    }
