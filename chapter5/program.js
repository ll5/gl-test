import { loadShader } from '../utils.js';

export async function initShaderProgram(gl) {
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
