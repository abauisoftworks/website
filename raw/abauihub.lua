local support = {
    [3101667897] = "https://raw.githubusercontent.com/CaseohCASEOH/aabbaaii/refs/heads/main/LOS.lua",
    [189707] = "https://raw.githubusercontent.com/CaseohCASEOH/aabbaaii/refs/heads/main/NDS"
}

local place = game.PlaceId
local url = support[place]

if url then
    loadstring(game:HttpGet(url))()
else
    loadstring(game:HttpGet("https://raw.githubusercontent.com/CaseohCASEOH/aabbaaii/refs/heads/main/2023479888634011.lua"))()
end
