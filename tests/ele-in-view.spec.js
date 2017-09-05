define([
    'aux/ele-in-view'
], function (eleInView) {
    describe('Checking how much an element is in view', function () {
        var div,
            result;

        describe('window as scrolling object', function () {
            it('should return that the element is fully in view when at top', function () {
                div = {
                    getBoundingClientRect: function () {
                        return {
                            top: 0,
                            bottom: 250,
                            left: 0,
                            right: 250
                        };
                    }
                };

                result = eleInView(div, 250, 250, {
                    innerHeight: 250,
                    innerWidth: 250
                });

                expect(result.horizontal.pixels).toBe(250);
                expect(result.horizontal.ratio).toBe(1);

                expect(result.vertical.pixels).toBe(250);
                expect(result.vertical.ratio).toBe(1);

                expect(result.pixels).toBe(62500);
                expect(result.ratio).toBe(1);
            });

            it('should return that the element is fully in view when not at top', function () {
                div = {
                    getBoundingClientRect: function () {
                        return {
                            top: 250,
                            bottom: 500,
                            left: 0,
                            right: 250
                        };
                    }
                };

                result = eleInView(div, 250, 250, {
                    innerHeight: 500,
                    innerWidth: 600
                });

                expect(result.horizontal.pixels).toBe(250);
                expect(result.horizontal.ratio).toBe(1);

                expect(result.vertical.pixels).toBe(250);
                expect(result.vertical.ratio).toBe(1);

                expect(result.pixels).toBe(62500);
                expect(result.ratio).toBe(1);
            });

            it('should return that the element is only half in view (bottom / right cut)', function () {
                div = {
                    getBoundingClientRect: function () {
                        return {
                            top: 0,
                            bottom: 250,
                            left: 0,
                            right: 250
                        };
                    }
                };

                result = eleInView(div, 250, 250, {
                    innerHeight: 125,
                    innerWidth: 125
                });

                expect(result.horizontal.pixels).toBe(125);
                expect(result.horizontal.ratio).toBe(0.5);

                expect(result.vertical.pixels).toBe(125);
                expect(result.vertical.ratio).toBe(0.5);

                expect(result.pixels).toBe(15625);
                expect(result.ratio).toBe(0.25);
            });

            it('should return that the element is only half in view (top / left cut)', function () {
                div = {
                    getBoundingClientRect: function () {
                        return {
                            top: -125,
                            bottom: 125,
                            left: -125,
                            width: 125
                        };
                    }
                };

                result = eleInView(div, 250, 250, {
                    innerHeight: 125,
                    innerWidth: 125
                });

                expect(result.horizontal.pixels).toBe(125);
                expect(result.horizontal.ratio).toBe(0.5);

                expect(result.vertical.pixels).toBe(125);
                expect(result.vertical.ratio).toBe(0.5);

                expect(result.pixels).toBe(15625);
                expect(result.ratio).toBe(0.25);
            });

            it('should return that the element is not in view at all below the viewport', function () {
                div = {
                    getBoundingClientRect: function () {
                        return {
                            top: 500,
                            bottom: 750,
                            left: 500,
                            right: 750
                        };
                    }
                };

                result = eleInView(div, 250, 250, {
                    innerHeight: 499,
                    innerWidth: 499
                });

                expect(result.horizontal.pixels).toBe(0);
                expect(result.horizontal.ratio).toBe(0);

                expect(result.vertical.pixels).toBe(0);
                expect(result.vertical.ratio).toBe(0);

                expect(result.pixels).toBe(0);
                expect(result.ratio).toBe(0);
            });

            it('should return that the ele as a whole is not in viewport if one way still is set to be', function () {
                div = {
                    getBoundingClientRect: function () {
                        return {
                            top: 0,
                            bottom: 250,
                            left: 251,
                            right: 501
                        };
                    }
                };

                result = eleInView(div, 250, 250, {
                    innerHeight: 250,
                    innerWidth: 250
                });

                expect(result.horizontal.pixels).toBe(0);
                expect(result.horizontal.ratio).toBe(0);

                expect(result.vertical.pixels).toBe(250);
                expect(result.vertical.ratio).toBe(1);

                expect(result.pixels).toBe(0);
                expect(result.ratio).toBe(0);
            });

            it('should return that the element is not in view at all above the viewport', function () {
                div = {
                    getBoundingClientRect: function () {
                        return {
                            top: -251,
                            bottom: -1,
                            left: -251,
                            right: -1
                        };
                    }
                };

                result = eleInView(div, 250, 250, {
                    innerHeight: 500,
                    innerWidth: 500
                });

                expect(result.pixels).toBe(0);
                expect(result.ratio).toBe(0);
            });

            it('should return that the element is partially in view', function () {
                div = {
                    getBoundingClientRect: function () {
                        return {
                            top: -225,
                            bottom: 25,
                            left: -225,
                            right: 25
                        };
                    }
                };

                result = eleInView(div, 250, 250, {
                    innerHeight: 500,
                    innerWidth: 500
                });

                expect(result.horizontal.pixels).toBe(25);
                expect(result.horizontal.ratio).toBe(0.1);

                expect(result.vertical.pixels).toBe(25);
                expect(result.vertical.ratio).toBe(0.1);

                expect(result.pixels).toBe(625);
                expect(result.ratio).toBe(0.01);
            });
        });

        describe('parent element as scrolling object', function () {
            var viewport;

            it('should return that the element is fully in view when at top', function () {
                div = {
                    getBoundingClientRect: function () {
                        return {
                            top: 0,
                            bottom: 250
                        };
                    }
                };

                viewport = {
                    clientHeight: 250,
                    clientWidth: 250,
                    getBoundingClientRect: function () {
                        return {
                            top: 0,
                            left: 0
                        };
                    }
                };

                result = eleInView(div, 250, 250, viewport, 'element');

                expect(result.pixels).toBe(62500);
                expect(result.ratio).toBe(1);
            });

            it('should return that the element is fully in view when not at top', function () {
                div = {
                    getBoundingClientRect: function () {
                        return {
                            top: 250,
                            bottom: 500
                        };
                    }
                };

                viewport = {
                    clientHeight: 500,
                    clientWidth: 500,
                    getBoundingClientRect: function () {
                        return {
                            top: 0,
                            left: 250
                        };
                    }
                };

                result = eleInView(div, 250, 250, viewport, 'element');

                expect(result.pixels).toBe(62500);
                expect(result.ratio).toBe(1);
            });

            it('should return that the element is only half in view (bottom cut)', function () {
                div = {
                    getBoundingClientRect: function () {
                        return {
                            top: 0,
                            bottom: 250
                        };
                    }
                };

                viewport = {
                    clientHeight: 125,
                    clientWidth: 125,
                    getBoundingClientRect: function () {
                        return {
                            top: 0,
                            left: 0
                        };
                    }
                };

                result = eleInView(div, 250, 250, viewport, 'element');

                expect(result.pixels).toBe(15625);
                expect(result.ratio).toBe(0.25);
            });

            it('should return that the element is only half in view (top cut)', function () {
                div = {
                    getBoundingClientRect: function () {
                        return {
                            top: -125,
                            bottom: 125
                        };
                    }
                };

                viewport = {
                    clientHeight: 125,
                    clientWidth: 125,
                    getBoundingClientRect: function () {
                        return {
                            top: 0,
                            left: 0
                        };
                    }
                };

                result = eleInView(div, 250, 250, viewport, 'element');

                expect(result.pixels).toBe(15625);
                expect(result.ratio).toBe(0.25);
            });

            it('should return that the element is not in view at all below the viewport', function () {
                div = {
                    getBoundingClientRect: function () {
                        return {
                            top: 500,
                            bottom: 750
                        };
                    }
                };

                viewport = {
                    clientHeight: 499,
                    clientWidth: 499,
                    getBoundingClientRect: function () {
                        return {
                            top: 0,
                            left: 0
                        };
                    }
                };

                result = eleInView(div, 250, 250, viewport, 'element');

                expect(result.pixels).toBe(0);
                expect(result.ratio).toBe(0);
            });

            it('should return that the element is not in view at all above the viewport', function () {
                div = {
                    getBoundingClientRect: function () {
                        return {
                            top: -251,
                            bottom: -1
                        };
                    }
                };

                viewport = {
                    clientHeight: 500,
                    clientWidth: 500,
                    getBoundingClientRect: function () {
                        return {
                            top: 0,
                            left: 0
                        };
                    }
                };

                result = eleInView(div, 250, 250, viewport, 'element');

                expect(result.pixels).toBe(0);
                expect(result.ratio).toBe(0);
            });

            it('should return that the element is 10% in view', function () {
                div = {
                    getBoundingClientRect: function () {
                        return {
                            top: -225,
                            bottom: 25
                        };
                    }
                };

                viewport = {
                    clientHeight: 500,
                    clientWidth: 500,
                    getBoundingClientRect: function () {
                        return {
                            top: 0,
                            left: 0
                        };
                    }
                };

                result = eleInView(div, 250, 250, viewport, 'element');

                expect(result.pixels).toBe(625);
                expect(result.ratio).toBe(0.01);
            });

            it('should return that the element is only half in view (viewport is not at top of window)', function () {
                div = {
                    getBoundingClientRect: function () {
                        return {
                            top: -75,
                            bottom: 175
                        };
                    }
                };

                viewport = {
                    clientHeight: 175,
                    clientWidth: 175,
                    getBoundingClientRect: function () {
                        return {
                            top: 50,
                            left: 0
                        };
                    }
                };

                result = eleInView(div, 250, 250, viewport, 'element');

                expect(result.pixels).toBe(21875);
                expect(result.ratio).toBe(0.35);
            });
        });
    });
});
