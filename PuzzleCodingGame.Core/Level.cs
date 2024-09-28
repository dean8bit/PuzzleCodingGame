namespace PuzzleCodingGame.Core;

public abstract class Level
{

    public Tilemap Tilemap { get; set; } = new Tilemap();
    public Guy Guy { get; set; } = new Guy();
    public List<IPlugin> Plugins { get; } = new();
    public abstract void CustomUpdate();
    public void Update()
    {
        Guy.Plugins.ForEach(v => v.Pre(this));
        Plugins.ForEach(v => v.Pre(this));
        CustomUpdate();
        Plugins.ForEach(v => v.Post(this));
        Guy.Plugins.ForEach(v => v.Post(this));
    }
}
