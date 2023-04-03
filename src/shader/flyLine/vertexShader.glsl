attribute float aSize;
varying float vSize;
void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    vSize = (aSize - 500.0) * 0.1;
    gl_PointSize = -vSize / viewPosition.z;
}