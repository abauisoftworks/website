-- credit aabbaaii13/14 if you modified this script
if not game:GetService("Players").LocalPlayer:WaitForChild("PlayerGui"):FindFirstChild("TopbarStandard") then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/aabbaaii13/aabbaaii/refs/heads/main/Topbar.lua"))()
end

local screengui = game:GetService("Players").LocalPlayer.PlayerGui.TopbarStandard.Holders.Left
local frame = Instance.new("Frame", screengui)
local textlabel = Instance.new("TextLabel", frame)
local uicorner = Instance.new("UICorner", frame)

frame.Name = "Widget"
frame.Size = UDim2.new(0, 44, 0, 44)
frame.Position = UDim2.new(0.85, 0, 0, 0)
frame.BackgroundColor3 = Color3.new(0, 0, 0)
frame.BackgroundTransparency = 0.1

textlabel.Size = UDim2.new(1, 0, 1, 0)
textlabel.BackgroundTransparency = 1
textlabel.TextColor3 = Color3.new(1, 1, 1)
textlabel.Text = "FPS: 0"
textlabel.TextSize = 12
textlabel.Font = Enum.Font.GothamBold

uicorner.CornerRadius = UDim.new(1, 0)

local n = 0
local o = 0

game:GetService("RunService").RenderStepped:Connect(function(q)
    n += 1
    o += q
    if o >= 1 then
        local r = n / o
        textlabel.Text = string.format("FPS: %.0f", r)
        n = 0
        o = 0
    end

end)
