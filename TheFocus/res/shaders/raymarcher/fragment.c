uniform vec2 resolution;
uniform float time;
uniform float audioTime;
uniform vec3 cam_pos;
float PI = 3.14159265;

varying vec2 vUv;

float sdPlane(vec3 p)
{
	return p.y;
}

float sdSphere(vec3 p, float s)
{
	//return length(p) - s;
	return length(max(abs(p) - s, .0));
}

vec2 opU(vec2 d1, vec2 d2)
{
	return (d1.x < d2.x) ? d1 : d2;
}

vec2 map(vec3 pos)
{
	vec2 pl = vec2(sdPlane(pos), 1.);
	vec2 sph = vec2(sdSphere(pos, 1.), 49.6);

	vec2 res = opU(pl, sph);

	return res;
}

vec2 castRay(vec3 ro, vec3 rd)
{
	float t = 0.;
	float m = -1.;
	for (int i = 0; i < 50; i++)
	{
		vec2 res = map(ro + rd*t);
		t += res.x;
		m = res.y;
	}

	return vec2(t, m);
}

vec3 sky = vec3(.8, .9, 1.);

vec3 applyFog(vec3 rgb, float distance)
{
	vec3 fogColor = sky;
	float fogAmount = 1. - exp(-distance * .03);
	return mix(rgb, fogColor, fogAmount);
}

vec3 applyScattering(vec3 rgb, float distance, vec3 rayDir)
{
	float fogAmount = 1. - exp(-distance * .03);
	float sunAmount = max(dot(rayDir, rayDir), .0);
	vec3 fogColor = mix(sky, vec3(1.,.9,.7), pow(sunAmount,8.));
	return mix(rgb, fogColor, fogAmount);
}

vec3 render(vec3 ro, vec3 rd)
{
	vec3 light1 = normalize(vec3(-.8, .4, -.3));
	vec3 col = vec3(.7, .9, 1.) + rd.y * .8;
	vec2 res = castRay(ro, rd);
	float t = res.x;
	float m = res.y;
	if (m > -.5)
	{
		col = .45 + .3 * sin(vec3(.05, .08, .1)*(m - 1.));
		//col = applyScattering(col, t, rd);
		col = mix(col, sky, 1. - exp(-.03 * res.x * res.x));
		float sundot = clamp(dot(rd, light1), 0., 1.);
		col += .1 * vec3(1., .7, .4)*pow(sundot, 5.);
		col += .25 * vec3(1., .8, .6)*pow(sundot, 64.);
		col += .2 * vec3(1., .8, .6)*pow(sundot, 512.);

		//float zdepth = 1. / (1. + t * t * .5);
		//float zdepth = 1. / (.5 + t * .5);
		//col = mix(col, sky, 1. - exp(-.002 * res.x * res.x));

	}

	return vec3(clamp(col, 0., 1.));
}

mat3 setCamera(vec3 ro, vec3 ta, float cr)
{
	vec3 cw = normalize(ta - ro);
	vec3 cp = vec3(sin(cr), cos(cr), 0.);
	vec3 cu = normalize(cross(cw, cp));
	vec3 cv = normalize(cross(cu, cw));
	return mat3(cu, cv, cw);
}

void main()
{
	vec2 q = gl_FragCoord.xy / resolution.xy;
	vec2 p = -1. + 2.*q;
	p.x *= resolution.x / resolution.y;

	//vec3 ro = vec3(-.5 + 3.5*cos(.2*time), 1., .5 + 3.5*sin(.2*time));
	vec3 ro = vec3(5., .5, cos(time*.5)+2.);
	vec3 ta = vec3(0., 1., 0.);
	mat3 ca = setCamera(ro, ta, .0);
	vec3 rd = ca * normalize(vec3(p.xy, 2.));
	vec3 col = render(ro, rd);

	gl_FragColor = vec4(col, 1.);
}


























/*float map(vec3 p)
{
	vec3 q = fract(p) * 2. - 1.;

	return length(q) - .25;
}

// origin, ray
float trace(vec3 o, vec3 r)
{
	float t = 0.;

	for (int i = 0; i < 50; i++)
	{
		vec3 p = o + r * t;
		float d = map(p);
		t += d * .5;
	}

	return t;
}

const float bpm = 145.;

float impulse(float k, float x)
{
	float h = k*x;
	return h * exp(1. - h);
}

void main()
{
	vec2 uv = vUv.xy * 2. - 1.;

	vec3 r = normalize(vec3(uv, 1.));

	r.xy *= mat2(sin(time),cos(time),
				 cos(time),-sin(time));

	vec3 o = vec3(0.,0.,0.);

	float t = trace(o, r);

	float fog = 1. / (1. + t * t * .05);

	vec3 fc = vec3(fog);

	gl_FragColor = vec4(fc, 1);
}*/

/*void main()
{
vec3 col = vec3(0);
gl_FragColor = vec4(col, 1);

vec3 c;
float l, z = time;
for (int i = 0; i<3; i++)
{
vec2 uv, p = gl_FragCoord.xy / resolution;
p -= .5;
p.x *= resolution.x / resolution.y;
z += .04;
l = length(p);
uv += p / l*(sin(z) + 1.)*abs(sin(l*9. - z*2.));
c[i] = .01 / length(abs(mod(uv, 1.) - .5));
}

gl_FragColor = vec4(c / l, 1);
}*/

/*vec3 nrand3(vec2 co)
{
vec3 a = fract(cos(co.x*6.2e-4 + co.y)*vec3(1.1e5, 3.9e5, 2.4e5));
vec3 b = fract(sin(co.x*0.1e-2 + co.y)*vec3(7.1e5, 1.3e5, 1.5e5));
vec3 c = mix(a, b, 0.5);
return c;
}*/

/*void main()
{
	vec2 uv = 2. * gl_FragCoord.xy / resolution.xy - 1.;
	vec2 uvs = uv * resolution.xy / max(resolution.x, resolution.y);
	vec3 p = vec3(uvs / 4., 0) + vec3(1., -1.3, 0.);
	vec3 c = vec3(0, 0, 0);

	vec2 seed = p.xy * 2.;
	seed.x += time * 0.002;
	seed = floor(seed * resolution.x);
	vec3 rnd = nrand3(seed);
	vec4 starcolor = vec4(pow(rnd.y, 40.));

	vec2 seed2 = p.xy * 2. + 10.;
	seed2.x += time * 0.005;
	seed2 = floor(seed2 * resolution.x);
	vec3 rnd2 = nrand3(seed2);
	starcolor += vec4(pow(rnd2.y, 40.));

	gl_FragColor = starcolor;
}*/