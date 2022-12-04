attribute vec4 avPosition;
attribute vec4 avColor;
uniform mat4 uMvMatrix;
uniform mat4 uProMatrix;

varying lowp vec4 vColor;

void main() {
    gl_Position = uProMatrix * uMvMatrix * avPosition;
    vColor = avColor;
}
