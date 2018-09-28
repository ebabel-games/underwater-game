const boundingBox = (mesh) => {
  const box = new THREE.Box3().setFromObject(mesh);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);

  return {
    max: box.max,
    min: box.min,
    size,
    center
  };
};

export { boundingBox };
