precision mediump float;
uniform vec4 u_data[2];
uniform vec3 u_light_dir[1];
varying vec3 v_norm;
varying vec2 v_tex;

float MIN_LIGHT = 0.3;

void main() {
    float pct = MIN_LIGHT + (1.0 - MIN_LIGHT)*(0.5 + 0.5*dot(v_norm, u_light_dir[0]));
    float loc = 0.5 - min(v_tex.x, 1.0 - v_tex.x);
    float sf = 1.0 / u_data[1].x;
    float zone0 = float(loc < sf * u_data[0].x);
    float zone1 = float(loc < sf * u_data[0].y);
    float zone2 = float(loc < sf * u_data[0].z);
    float zone3 = float(loc < sf * u_data[0].w);
    zone1 -= zone0;
    zone2 -= zone0 + zone1;
    zone3 -= zone0 + zone1 + zone2;
    float noZone = 1.0 - zone0 - zone1 - zone2 - zone3;
    vec4 rtn = vec4(0.0, 0.0, 0.0, 1.0);
    rtn.xyz += zone0 * vec3(0.0, 1.0, 0.7);
    rtn.xyz += zone1 * vec3(0.1, 0.9, 0.6);
    rtn.xyz += zone2 * vec3(0.2, 0.8, 0.5);
    rtn.xyz += zone3 * vec3(0.5, 0.5, 0.5);
    rtn.xyz *= u_data[1].y;
    rtn.xyz += max(noZone, 1.0-u_data[1].y) * vec3(0.87, 0.65, 0.35);
    rtn.xyz *= pct;
    gl_FragColor = rtn;
}
