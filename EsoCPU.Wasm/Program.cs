using System;
using Bootsharp;
using EsoCPU;

namespace EsoCPU.Wasm;

public static partial class Program
{
    public static EsoCPU.CPU CPU { get; private set; }
    public static void Main()
    {
        OnMainInvoked($"Hello {GetFrontendName()}, .NET here!");
    }

    [JSInvokable]
    public static void CreateCPU() => Program.CPU = new EsoCPU.CPU(new EsoCPU.Memory(32));
    [JSInvokable]
    public static int GetMemory(int loc)
    {
        Program.CPU.Memory.GetAt(loc, out var value);
        return value;
    }

    [JSInvokable]
    public static int[] GetAllMemory(int loc) => Program.CPU.Memory.GetAll();

    [JSInvokable]
    public static void SetMemory(int loc, int value)
    {
        Program.CPU.Memory.SetAt(loc, value);
    }

    [JSEvent] // Used in JS as Program.onMainInvoked.subscribe(...)
    public static partial void OnMainInvoked(string message);

    [JSFunction] // Assigned in JS as Program.getFrontendName = ...
    public static partial string GetFrontendName();

    [JSInvokable] // Invoked from JS as Program.GetBackendName()
    public static string GetBackendName() => $".NET {Environment.Version}";
}