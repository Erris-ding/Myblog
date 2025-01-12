var Stage = function () {
	function t(t, n, i) {
		var e = this;
		this.canvas = document.getElementById(t), this.ctx = this.canvas.getContext("2d"), this.renderList = [], this.needClear = !0, this.canvas.width = n || $(window).width(), this.canvas.height = i || $(window).height(), $(window).on("resize", function () {
			e.canvas.width = n || $(window).width(), e.canvas.height = i || $(window).height()
		})
	}
	return window.requestAnimationFrame = function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
			window.setTimeout(t, 1e3 / 60)
		}
	}(), t.prototype.update = function () {
		var t = this;
		t.needClear && t.ctx.clearRect(0, 0, t.canvas.width, t.canvas.height), t.renderList.forEach(function (n) {
			n(t.ctx, t.canvas)
		}), requestAnimationFrame(function () {
			t.update()
		})
	}, t.prototype.onUpdate = function (t) {
		this.renderList.push(t)
	}, t
}();
var Twinkle = function () {
	function t(t, e, a) {
		this.initSymbols(t, e, a), this.particles = [], this._pool = [], this.mouse = new s
	}

	function s(t, s) {
		this.x = t || 0, this.y = s || 0
	}

	function e(t, s, e) {
		this.color = n(t), this.size = 2 * (s + e);
		for (var a = 0, i = o.length; i > a; a++) this.push(this._createSymbol(o[a], s, e))
	}

	function a(t, s, e, a, i, o) {
		this.init(t, s, e, a, i, o)
	}

	function i(t, s, e, a, i) {
		return "rgba" === t ? "rgba(" + s + "," + e + "," + a + "," + i + ")" : "hsla" === t ? "hsla(" + s + "," + e + "%," + a + "%," + i + ")" : ""
	}
	if (!document.createElement("canvas").getContext) return $.noop;
	var o = [4, 6, 8, 10, 12],
		h = 2500;
	t.prototype = {
		mouse: null,
		gravity: .035,
		initSymbols: function (t, s, a) {
			this._symbols = new e(t, s, a)
		},
		render: function (t) {
			var s, e, a, i, o, n, r, l, p, c, d, m, u, y, g, f = this.particles,
				v = this.mouse,
				b = this.gravity,
				M = this._symbols,
				x = this._symbols.length,
				_ = this._symbols.size,
				w = .5 * this._symbols.size,
				I = t.canvas.width,
				$ = t.canvas.height;
			if (s = Math.min(.005 * (v.speedX * v.speedX + v.speedY * v.speedY), 1), f.length < h)
				for (e = .5 + 4.5 * s, a = .1 + .5 * s, i = .5 + .5 * s, y = (3 * Math.random() | 0) + (20 * s | 0), u = 0; y > u; u++) this._createParticle(a, e, i);
			for (p = .5 * -I, c = 1.5 * I, d = .5 * -$, m = 1.5 * $, u = 0, y = f.length; y > u; u++) g = f[u], g.vx += .03 * v.speedX * s, g.vy += .03 * v.speedY * s + b, g.x += g.vx + v.speedX, g.y += g.vy + v.speedY, g.scale -= .005, g.angle += Math.random(), g.x + w < p || g.x - w > c || g.y + w < d || g.y - w > m || g.scale <= 0 ? (this._pool.push(g), f.splice(u, 1), y--, u--) : (l = g.scale, o = M[x * Math.random() | 0], Math.random() < .7 && (l *= .2), n = _ * l, r = .5 * n, t.save(), t.globalCompositeOperation = "lighter", t.translate(g.x, g.y), t.rotate(g.angle), t.drawImage(o, 0, 0, _, _, -r, -r, n, n), t.restore());
			t.fill(), v.speedX = v.speedY = 0
		},
		_createParticle: function (t, s, e) {
			var i = t + (s - t) * Math.random(),
				o = 2 * Math.PI * Math.random(),
				h = this._pool.length ? this._pool.shift() : new a;
			h.init(this.mouse.x, this.mouse.y, i * Math.cos(o), i * Math.sin(o), e * Math.random(), 2 * Math.PI * Math.random()), this.particles.push(h)
		}
	}, s.prototype = {
		x: 0,
		y: 0,
		speedX: 0,
		speedY: 0,
		update: function (t, s) {
			this.speedX = .7 * (this.x - t), this.speedY = .7 * (this.y - s), this.x = t, this.y = s
		}
	}, e.prototype = [], e.prototype._createSymbol = function (t, s, e) {
		var a, o, h = this.size,
			n = this.size / 2,
			r = this.color;
		a = document.createElement("canvas"), a.width = a.height = h, o = a.getContext("2d"), o.fillStyle = i(r[0], r[1], r[2], r[3], r[4]), o.shadowBlur = e, o.shadowColor = i(r[0], r[1], r[2], r[3], .75 * r[4]);
		var l, p, c, d;
		for (o.beginPath(), l = 1, p = 2 * t; p >= l; l++) c = l % 2 ? .1 * s : s, d = 2 * Math.PI * l / p, o[1 === l ? "moveTo" : "lineTo"](n + c * Math.cos(d), n + c * Math.sin(d));
		return o.fill(), a
	}, a.prototype.init = function (t, s, e, a, i, o) {
		this.x = t || 0, this.y = s || 0, this.vx = e || 0, this.vy = a || 0, this.scale = i || 0, this.angle = o || 0
	};
	var n = function () {
		var t = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/,
			s = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)$/,
			e = /^hsl\(\s*([\d\.]+)\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)%\s*\)$/,
			a = /^hsla\(\s*([\d\.]+)\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)\s*\)$/,
			i = /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
		return function (o) {
			o = o.replace(/^\s*#|\s*$/g, ""), o = o.toLowerCase();
			var h;
			return (h = o.match(t) || o.match(s)) ? ["rgba", parseInt(h[1], 10), parseInt(h[2], 10), parseInt(h[3], 10), parseFloat(4 === h.length ? 1 : h[4])] : (h = o.match(e) || o.match(a)) ? ["hsla", parseFloat(h[1]), parseFloat(h[2]), parseFloat(h[3]), parseFloat(4 === h.length ? 1 : h[4])] : (3 === o.length && (o = o.replace(/(.)/g, "$1$1")), (h = o.match(i)) ? ["rgba", parseInt(h[1], 16), parseInt(h[2], 16), parseInt(h[3], 16), 1] : null)
		}
	}();
	return t
}();
var Index = function () {
	var h = function () {
		return /(msie|trident)/.test(navigator.userAgent.toLowerCase())
	};
	if (!document.createElement("canvas").getContext || h()) return void $("canvas").remove();
	var v = new Stage("stage1"),
		m = new Twinkle("#D0E0F3", 14, 1);
	m.mouse.update(0, 0), $(window).on("mousemove", function (e) {
		m.mouse.update(e.clientX, e.clientY)
	}), v.onUpdate(function (e) {
		m.render(e)
	}), v.update();
}();