export async function loadGlsl(url) {
    const res = await fetch(url);
    const text = await res.text();
    return text;
}

export function createShader(glsl, type, gl) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, glsl);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

export async function loadShader(url, type, gl) {
    const glsl = await loadGlsl(url);
    const shader = createShader(glsl, type, gl);
    return shader;
}
