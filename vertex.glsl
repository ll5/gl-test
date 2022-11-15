attribute vec4 aVertexPosition;
uniform mat4 uModeViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
    gl_Position = uProjectionMatrix * uModeViewMatrix * aVertexPosition;
}
