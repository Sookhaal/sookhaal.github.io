uniform vec2 resolution;
uniform float time;
uniform float blurTransition;

varying vec2 UV;

mat2 m(float a)
{
	a += cos(UV.x * 5.) * sin(time*1.);
	return mat2(cos(a), -sin(a), sin(a), cos(a));
}

/*float complexity = .5;
float scale = 1.;
float speed = .7;
float coef = 1.;*/
float complexity = .5;
float scale = 1.;
float speed = .7;
float coef = 1.;

float map(vec3 p)
{
	p.zy *= m(time * .4);
	p.xy *= m(time * .3);
	vec3 q = p * 2. + time * 1.;
	//return length(p + vec3(sin(time * speed))) * log(length(p) + coef) + sin(q.x + sin(q.z + sin(q.y))) * complexity - scale;
	return length(p + vec3(sin(time * speed))) * log(length(p) + coef) + sin(q.x + sin(q.z + sin(q.y))) * complexity - scale;
}

//vec3 col1 = vec3(.1, .3, .4);
//vec3 col2 = vec3(5., 2.5, 3.);

//main tint
vec3 col1 = vec3(.1, .3, .6);

//reflection
vec3 col2 = vec3(5., 2.5, 3.);

float shine = .5;
float blowout = .1;

void main()
{
	vec2 uv = UV;
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	//p.x *= resolution.x / resolution.y;

	p.y *= .3;
	p.y += .1;
	p.x -= .2;

	float d = 2.;
	vec3 col = vec3(0.);

	blowout = .05 + (1. + cos(time * .34)) / 2. * .2;

	col2.x = (8. + cos(time * .13) * 5.) / 2.;

	col1 *= .5 - length(cos(time * .08) * sin(time * .2));

	//col2.y = 1.;

	//col2 *= length(cos(time) * sin(time * 1.5));

	for (int i = 0; i <= 5; i++)
	{
		vec3 p = vec3(0., 0., 5.) + normalize(vec3(p, -1.)) * d;
		float rz = map(p);

		//coloring
		float f = clamp((rz - map(p + blowout)) * shine, -.1, 1.);
		vec3 l = col1 + col2 * f;
		col = col * l + (1. - smoothstep(0., 2.5, rz)) * .7 * l;

		//blur control
		if (blurTransition < .8)
			d += min(rz, 1. - blurTransition);
		else
			d += min(rz, .2);
		//d += min(rz, .5);
	}

	if (time < 20.)
		col *= time / 20.;

	gl_FragColor = vec4(col, 1.);
}