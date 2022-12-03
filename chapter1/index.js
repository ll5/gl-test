import * as mat4 from '../gl-matrix/mat4.js';
import { loadShader } from './utils.js';

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

    return program;
}

function initBuffers(gl) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const position = new Float32Array([
        1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);
}

function drawScene(gl, program) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fovy = 45 * Math.PI / 180
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const projectionMatrix = mat4.create();
    mat4.perspective(
        projectionMatrix,
        fovy,
        aspect,
        0.1,
        100
    );

    const modelViewMatrix = mat4.create();
    const modelViewTranslate = [-0.0, 0.0, -10.0];
    mat4.translate(modelViewMatrix, modelViewMatrix, modelViewTranslate);

    const $vertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    const $projectionMatrix = gl.getUniformLocation(program, 'uProjectionMatrix');
    const $modelViewMatrix = gl.getUniformLocation(program, 'uModelViewMatrix');

    gl.vertexAttribPointer(
        $vertexPosition,
        2,
        gl.FLOAT,
        false,
        0,
        0
    );
    gl.enableVertexAttribArray($vertexPosition);

    gl.useProgram(program);


    gl.uniformMatrix4fv(
        $projectionMatrix,
        false,
        projectionMatrix
    );

    gl.uniformMatrix4fv(
        $modelViewMatrix,
        false,
        modelViewMatrix
    );

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}


async function draw() {
    const canvas = document.querySelector('#canvas');
    const gl = canvas.getContext('webgl');
    const program = await initShaderProgram(gl);

    if(!program) return;

    initBuffers(gl);
    drawScene(gl, program);
}

draw();
