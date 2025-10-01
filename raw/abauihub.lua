local support = {
    [3101667897] = "https://raw.githubusercontent.com/CaseohCASEOH/aabbaaii/refs/heads/main/LOS.lua",
    [121864768012064] = "https://raw.githubusercontent.com/CaseohCASEOH/aabbaaii/refs/heads/main/fishit.lua"
}

local place = game.PlaceId
local url = support[place]

if url then
    loadstring(game:HttpGet(url))()
else
    loadstring(game:HttpGet("https://raw.githubusercontent.com/CaseohCASEOH/aabbaaii/refs/heads/main/2023479888634011.lua"))()
end
