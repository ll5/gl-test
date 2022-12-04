attribute vec3 avPosition;
attribute vec4 avColor;
uniform mat4 uMvMatrix;
uniform mat4 uProMatrix;

varying lowp vec4 vColor;

void main() {
    gl_Position = uProMatrix * uMvMatrix * vec4(avPosition, 1.0);
    vColor = (vec4(avPosition, 1.0) + vec4(1.0, 1.0, 1.0, 1.0)) * 0.5;
}
