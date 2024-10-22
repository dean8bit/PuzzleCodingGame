using System.Collections.Generic;
using EsoCPU;

namespace PuzzleCodingGame.Core
{
    public enum Tiles
    {
        W, //WALL
        F, //FLOOR
        H, //HOLE
    }
    public abstract class Level
    {
        public CPU CPU { get; set; }
        public List<Tiles> Tiles { get; set; } = new List<Tiles>();
    }
}
