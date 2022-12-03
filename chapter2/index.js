import * as mat4 from '../gl-matrix/mat4.js';
import { loadShader } from '../utils.js';

async function initShaderProgram(gl) {
    const vertexShader = await loadShader('./vertex.glsl', gl.VERTEX_SHADER, gl);
    const fragmentShader = await loadShader('./fragment.glsl', gl.FRAGMENT_SHADER, gl);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    // 创建失败，alert
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log(gl.getProgramInfoLog(program));
        return null;
    }
    gl.useProgram(program);
    return program;
}

const position = new Float32Array([1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0]);
const colors = new Float32Array([1.0,  1.0,  1.0, 1.0,  0.0,  0.0, 0.0,  1.0,  0.0, 0.0,  0.0,  1.0]);
function initBuffers(gl, program) {
    // position buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);
    const avPosition = gl.getAttribLocation(program, 'avPosition');
    gl.vertexAttribPointer(avPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(avPosition);

    // color buffer
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
    const avColor = gl.getAttribLocation(program, 'avColor');
    gl.vertexAttribPointer(avColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(avColor);
}

function drawScene(gl, program) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fovy = 45 * Math.PI / 180
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const proMatrix = mat4.create();
    mat4.perspective(proMatrix, fovy, aspect, 0.1, 100);

    const mvMatrix = mat4.create();
    const mvTranslate = [-0.0, -0.0, -5.0];
    mat4.translate(mvMatrix, mvMatrix, mvTranslate);

    const uProMatrix = gl.getUniformLocation(program, 'uProMatrix');
    const uMvMatrix = gl.getUniformLocation(program, 'uMvMatrix');
    gl.uniformMatrix4fv(uProMatrix, false, proMatrix);
    gl.uniformMatrix4fv(uMvMatrix, false, mvMatrix);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}


async function draw() {
    const canvas = document.querySelector('#canvas');
    const gl = canvas.getContext('webgl');
    const program = await initShaderProgram(gl);

    if(!program) return;

    initBuffers(gl, program);
    drawScene(gl, program);
}

draw();
