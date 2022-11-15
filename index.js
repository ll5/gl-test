async function loadGlsl(url) {
    const res = await fetch(url);
    const text = await res.text();
    return text;
}
async function init() {
    const canvas = document.querySelector('#canvas');
    const gl = canvas.getContext('webgl');
    const program = await initShaderProgram(gl);

    console.log(program);
}
function loadShader(shaderStr, type, gl) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, shaderStr);
    gl.compileShader(shader);

    // @TODO Error catching

    return shader;
}

async function initShaderProgram(gl) {
    const vertexStr = await loadGlsl('./vertex.glsl');
    const fragmentStr = await loadGlsl('./fragment.glsl');
    const vertexShader = loadShader(vertexStr, gl.VERTEX_SHADER, gl);
    const fragmentShader = loadShader(fragmentStr, gl.FRAGMENT_SHADER, gl);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    // @TODO Error catching

    return program;
}

function initBuffers(gl) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const position = new Float32Array([
        1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        -1.0, -1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);

    return position;
}

init();
