attribute vec4 avPosition;
attribute vec2 avTextureCoordinate;

attribute vec4 avColor;
uniform mat4 uMvMatrix;
uniform mat4 uProMatrix;

varying highp vec2 vTextureCoordinate;

void main() {
    gl_Position = uProMatrix * uMvMatrix * avPosition;
    vTextureCoordinate = avTextureCoordinate;
}
