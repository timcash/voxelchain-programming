// @ts-ignore
import VoxelChain from "voxelchain";

// Define the material ids you want to generate with
const materialIds = [4, 5, 6, 6];
const [width, height, depth] = VoxelChain.getResolution();
// Reset the grid
VoxelChain.onReset();
// Generate terrain
const terrain = VoxelChain.getTerrainGenerator();
const lambda = 0.275;
terrain.generate(lambda, () => {return Math.random();});
// Fill in the terrain voxels into the grid
for (let z = 0; z < depth; ++z) {
  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      const state = terrain.getState(x, y, z);
      // If terrain state is positive, then it's a solid grid cell
      if (state > 0) {
        // Read voxel from world
        const voxel = VoxelChain.readVoxelAt(x, y, z);
        // Update the material id of the voxel
        voxel.cell.materialId = materialIds[state - 1];
        // Randomly rotate the voxel
        voxel.cell.rotation = 4 + Math.floor(Math.random() * 4);
        // Write voxel back into world
        VoxelChain.writeVoxelAt(x, y, z, voxel);
      }
    }
  }
}

console.log("Hello VoxelChain!");
