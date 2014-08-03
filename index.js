var vec2 = require('fd-vec2');

var types = {};

types.BODY_AABB           	= 1;
types.BODY_CIRCLE         	= 3;
types.BODY_POLYGON        	= 5;
types.BODY_LINE_SEGMENT   	= 7;
types.BODY_LINE           	= 8;
types.BODY_H_AXIS         	= 10;
types.BODY_V_AXIS         	= 12;

exports.types 				= types;

exports.AABB 				= AABB;
exports.Circle 				= Circle;
exports.Polygon 			= Polygon;
exports.LineSegment 		= LineSegment;
exports.Line 				= Line;
exports.HAxis 				= HAxis;
exports.VAxis 				= VAxis;

function AABB(width, height) {
	this.width = width;
	this.height = height;

	this.boundOffset = vec2(width / 2, height / 2);
	this.boundRadiusSq = ((width/2)*(width/2) + (height/2)*(height/2));
	this.boundRadius = Math.sqrt(this.boundRadiusSq);
}

AABB.prototype.type = types.BODY_AABB;

function Circle(radius) {
	this.radius = radius;

	this.boundOffset = vec2.zero();
	this.boundRadius = radius;
	this.boundRadiusSq = radius * radius;
}

Circle.prototype.type = types.BODY_CIRCLE;

function Polygon(points) {
	this.points = points;

	var maxSq = 0, zero = vec2.zero();
	for (var i = 0; i < this.points.length; ++i) {
		var p = this.points[i], d = vec2.distancesq(zero, p);
		if (d > maxSq) maxSq = d;
	}

	this.boundOffset = vec2.zero();
	this.boundRadiusSq = maxSq;
	this.boundRadius = Math.sqrt(maxSq);
}

Polygon.prototype.type = types.BODY_POLYGON;

function LineSegment(size) {
	this.size = vec2.clone(size);

	this.boundOffset = vec2.zero();
	vec2.midpoint(this.size, this.boundOffset);

	this.boundRadiusSq = this.boundOffset.magnitudesq();
	this.boundRadius = Math.sqrt(this.boundRadiusSq);
}

LineSegment.prototype.type = types.BODY_LINE_SEGMENT;

function Line(slope) {
	this.slope = vec2.clone(slope);
}

Line.prototype.type = types.BODY_LINE;

function HAxis() {}
HAxis.prototype.type = types.BODY_H_AXIS;

function VAxis() {}
VAxis.prototype.type = types.BODY_V_AXIS;[]