namespace PuzzleCodingGame.Core;

public interface IPlugin
{
    public void Pre(Level level);
    public void Post(Level level);
}
