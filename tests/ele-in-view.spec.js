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
                            bottom: 250
                        };
                    }
                };

                result = eleInView(div, 250, {
                    innerHeight: 250
                });

                expect(result.pixels).toBe(250);
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

                result = eleInView(div, 250, {
                    innerHeight: 500
                });

                expect(result.pixels).toBe(250);
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

                result = eleInView(div, 250, {
                    innerHeight: 125
                });

                expect(result.pixels).toBe(125);
                expect(result.ratio).toBe(0.5);
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

                result = eleInView(div, 250, {
                    innerHeight: 125
                });

                expect(result.pixels).toBe(125);
                expect(result.ratio).toBe(0.5);
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

                result = eleInView(div, 250, {
                    innerHeight: 499
                });

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

                result = eleInView(div, 250, {
                    innerHeight: 500
                });

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

                result = eleInView(div, 250, {
                    innerHeight: 500
                });

                expect(result.pixels).toBe(25);
                expect(result.ratio).toBe(0.1);
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
                    getBoundingClientRect: function () {
                        return {
                            top: 0
                        };
                    }
                };

                result = eleInView(div, 250, viewport, 'element');

                expect(result.pixels).toBe(250);
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
                    getBoundingClientRect: function () {
                        return {
                            top: 0
                        };
                    }
                };

                result = eleInView(div, 250, viewport, 'element');

                expect(result.pixels).toBe(250);
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
                    getBoundingClientRect: function () {
                        return {
                            top: 0
                        };
                    }
                };

                result = eleInView(div, 250, viewport, 'element');

                expect(result.pixels).toBe(125);
                expect(result.ratio).toBe(0.5);
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
                    getBoundingClientRect: function () {
                        return {
                            top: 0
                        };
                    }
                };

                result = eleInView(div, 250, viewport, 'element');

                expect(result.pixels).toBe(125);
                expect(result.ratio).toBe(0.5);
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
                    getBoundingClientRect: function () {
                        return {
                            top: 0
                        };
                    }
                };

                result = eleInView(div, 250, viewport, 'element');

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
                    getBoundingClientRect: function () {
                        return {
                            top: 0
                        };
                    }
                };

                result = eleInView(div, 250, viewport, 'element');

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
                    getBoundingClientRect: function () {
                        return {
                            top: 0
                        };
                    }
                };

                result = eleInView(div, 250, viewport, 'element');

                expect(result.pixels).toBe(25);
                expect(result.ratio).toBe(0.1);
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
                    getBoundingClientRect: function () {
                        return {
                            top: 50
                        };
                    }
                };

                result = eleInView(div, 250, viewport, 'element');

                expect(result.pixels).toBe(125);
                expect(result.ratio).toBe(0.5);
            });
        });
    });
});
