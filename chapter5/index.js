import * as mat4 from '../gl-matrix/mat4.js';
import { initShaderProgram } from './program.js';
import { vPositions, vIndexes, vTextureCoordinates } from './vertices.js';
import { initTexture } from './texture.js';

const position = new Float32Array(vPositions);
const textureCoordinates = new Float32Array(vTextureCoordinates);
const indexes = new Uint16Array(vIndexes);

function initBuffers(gl, program) {
    // position buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);
    const avPosition = gl.getAttribLocation(program, 'avPosition');
    gl.vertexAttribPointer(avPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(avPosition);

    // texture buffer
    const textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, textureCoordinates, gl.STATIC_DRAW);
    const avTextureCoordinate = gl.getAttribLocation(program, 'avTextureCoordinate');
    gl.vertexAttribPointer(avTextureCoordinate, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(avTextureCoordinate);

    // bind fragment shader variable
    const uSampler = gl.getUniformLocation(program, 'uSampler');
    gl.uniform1i(uSampler, 0);

    // index buffer
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexes, gl.STATIC_DRAW);
}

let radius = 0;
function drawScene(gl, program) {
    function draw() {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // perspective
        const fovy = 45 * Math.PI / 180
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const proMatrix = mat4.create();
        mat4.perspective(proMatrix, fovy, aspect, 0.1, 100);

        // transform
        const mvMatrix = mat4.create();
        const mvTranslate = [-0.0, -0.0, -5.0];
        mat4.translate(mvMatrix, mvMatrix, mvTranslate);
        mat4.rotate(mvMatrix, mvMatrix, radius, [1,1,1]);

        const uProMatrix = gl.getUniformLocation(program, 'uProMatrix');
        const uMvMatrix = gl.getUniformLocation(program, 'uMvMatrix');
        gl.uniformMatrix4fv(uProMatrix, false, proMatrix);
        gl.uniformMatrix4fv(uMvMatrix, false, mvMatrix);

        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
        radius += 0.02;
        requestAnimationFrame(draw);
    }
    draw();
}


async function draw() {
    const canvas = document.querySelector('#canvas');
    const gl = canvas.getContext('webgl');
    const program = await initShaderProgram(gl);

    if(!program) return;

    await initTexture(gl, './111.png');

    initBuffers(gl, program);

    drawScene(gl, program);
}

draw();
