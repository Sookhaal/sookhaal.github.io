varying vec2 UV;

void main()
{
	// UV binding
	UV = uv;

	// Fullscreen quad
	gl_Position = vec4(position, 1.);
}