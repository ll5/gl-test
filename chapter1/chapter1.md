# Chapter 1

### Overview
1. init shader
    1. gl.createShader
    1. gl.shaderSource
    1. gl.compileShader
    
1. init program    
    1. gl.createProgram
    1. gl.attachShader
    1. gl.linkProgram
    1. programInfo   
        1. attributeLocations
            1. vertexPosition(getAttribLocation)
        1. uniformLocations
            1. projectionMatrix(getUniformLocation)
            1. modelViewMatrix(getUniformLocation)
    
1. init buffer
    1. gl.createBuffer
    1. gl.bindBuffer
    1. gl.bufferData
1. draw
    1. clear
        1. gl.clearColor 
        1. gl.clearDepth
        1. gl.enable
        1. gl.depthFunc
        1. gl.clear
    
    1. create projection matrix
        1. mat4.create
        1. mat4.perspective
    1. create model view matrix
        1. mat4.create
        1. mat4.translate
    1. gl.vertexAttribPointer
    1. gl.enableVertexAttribArray
    1. gl.useProgram
    1. gl.uniformMatrix4fv(proj + mv)
    1. gl.drawArrays
