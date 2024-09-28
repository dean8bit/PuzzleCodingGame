namespace PuzzleCodingGame.Core;

public class Guy
{
    public EsoCPU.CPU CPU { get; } = new(new EsoCPU.Memory(32));
    public List<IPlugin> Plugins { get; } = new();
}
