const cors = require('cors');
const config = require('../config');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const axios = require('axios');
const {default: PQueue} = require('p-queue');
const sha512 = require('js-sha512');

const userModel = require('./schemas/user');
const characterModel = require('./schemas/character');
const minionModel = require('./schemas/minion');
const mountModel = require('./schemas/mount');
const orchestrionModel = require('./schemas/orchestrion');
const dungeonModel = require('./schemas/dungeon');
const spellModel = require('./schemas/spell');
const cardModel = require('./schemas/card');

const queue = new PQueue({concurrency: 1});

let domain;
try {
    const domainUrl = new URL(config.domain);
    domain = {
    host: domainUrl.hostname,
    protocol: domainUrl.protocol,
    };
} catch (e) {
    console.log(e);
    throw new TypeError("Invalid domain specific in the config file.");
}

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use(cors());

// We bind the domain.
app.locals.domain = config.domain.split("//")[1];
// We initialize body-parser middleware to be able to read forms.
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
    extended: true,
    }),
);

mongoose.connect(config.mongodb_srv, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Connected to the Dungeoneer Database`)
}).catch((err) =>{
    console.log(err);
});

// Minions GET
app.get('/api/minions', async(req,res) => {
    let dbMinions = await minionModel.find();
    if(dbMinions.length == 0){
        let response = await axios.get('https://ffxivcollect.com/api/minions');
        let fetchedMinions = response.data.results;
        for(let i = 0; i < fetchedMinions.length; i++){
            await minionModel.create({
                id: fetchedMinions[i].id,
                name: fetchedMinions[i].name,
                description: fetchedMinions[i].description,
                enhanced_description: fetchedMinions[i].enhanced_description,
                tooltip: fetchedMinions[i].tooltip,
                patch: fetchedMinions[i].patch,
                image: fetchedMinions[i].image,
                icon: fetchedMinions[i].icon,
                owned: fetchedMinions[i].owned,
                player_owns: fetchedMinions[i].player_owns,
                sources: fetchedMinions[i].sources,
              });
        }
        let dbMinions = await minionModel.find();
        res.json(dbMinions);
    }else{
        res.json(dbMinions);
    }
})

// Mounts GET
app.get('/api/mounts', async(req,res) => {
    let dbMounts = await mountModel.find();
    if(dbMounts.length == 0){
        let response = await axios.get('https://ffxivcollect.com/api/mounts');
        let fetchedMounts = response.data.results;
        for(let i = 0; i < fetchedMounts.length; i++){
            await mountModel.create({
                id: fetchedMounts[i].id,
                name: fetchedMounts[i].name,
                description: fetchedMounts[i].description,
                enhanced_description: fetchedMounts[i].enhanced_description,
                tooltip: fetchedMounts[i].tooltip,
                patch: fetchedMounts[i].patch,
                image: fetchedMounts[i].image,
                icon: fetchedMounts[i].icon,
                owned: fetchedMounts[i].owned,
                player_owns: fetchedMounts[i].player_owns,
                sources: fetchedMounts[i].sources,
              });
        }
        let dbMounts = await mountModel.find();
        res.json(dbMounts);
    }else{
        res.json(dbMounts);
    }
})

// Orchestrions GET
app.get('/api/orchestrions', async(req,res) => {
    let dbOrchestrions = await orchestrionModel.find();
    if(dbOrchestrions.length == 0){
        let response = await axios.get('https://ffxivcollect.com/api/orchestrions');
        let fetchedOrchestrions = response.data.results;
        for(let i = 0; i < fetchedOrchestrions.length; i++){
            await orchestrionModel.create({
                id: fetchedOrchestrions[i].id,
                name: fetchedOrchestrions[i].name,
                description: fetchedOrchestrions[i].description,
                patch: fetchedOrchestrions[i].patch,
                icon: fetchedOrchestrions[i].icon,
                owned: fetchedOrchestrions[i].owned,
                number: fetchedOrchestrions[i].number,
                category: fetchedOrchestrions[i].category,
              });
        }
        let dbOrchestrions = await orchestrionModel.find();
        res.json(dbOrchestrions);
    }else{
        res.json(dbOrchestrions);
    }
})

// Blue Spells GET
app.get('/api/spells', async(req,res) => {
    let dbSpells = await spellModel.find();
    if(dbSpells.length == 0){
        let response = await axios.get('https://ffxivcollect.com/api/spells');
        let fetchedSpells = response.data.results;
        for(let i = 0; i < fetchedSpells.length; i++){
            await spellModel.create({
                id: fetchedSpells[i].id,
                name: fetchedSpells[i].name,
                description: fetchedSpells[i].description,
                patch: fetchedSpells[i].patch,
                icon: fetchedSpells[i].icon,
                owned: fetchedSpells[i].owned,
                sources: fetchedSpells[i].sources,
              });
        }
        let dbSpells = await spellModel.find();
        res.json(dbSpells);
    }else{
        res.json(dbSpells);
    }
})

// Triple Triad Card GET
app.get('/api/cards', async(req,res) => {
    let dbCard = await cardModel.find();
    if(dbCard.length == 0){
        let response = await axios.get('https://triad.raelys.com/api/cards');
        let fetchedCards = response.data.results;
        for(let i = 0; i < fetchedCards.length; i++){
            await cardModel.create({
                id: fetchedCards[i].id,
                name: fetchedCards[i].name,
                description: fetchedCards[i].description,
                patch: fetchedCards[i].patch,
                icon: fetchedCards[i].icon,
                owned: fetchedCards[i].owned,
                sources: fetchedCards[i].sources,
              });
        }
        let dbCard = await cardModel.find();
        res.json(dbCard);
    }else{
        res.json(dbCard);
    }
})

// Dungeon GET
app.get('/api/dungeons', async(req,res) => {
    let dbDungeon = await dungeonModel.find();
    if(dbDungeon.length == 0){
        let response = await axios.get('https://xivapi.com/InstanceContent?limit=87');
        let fetchedDungeons = response.data.Results;
        for(let i = 0; i < fetchedDungeons.length; i++){
            await dungeonModel.create({
                id: fetchedDungeons[i].ID,
                name: fetchedDungeons[i].Name,
            });
        }
        let dbDungeon = await dungeonModel.find();
        res.json(dbDungeon);
    }else{
        res.json(dbDungeon);
    }
})
// This fills up some extra dungeon data like banners and descriptions
app.get('/api/dungeonInfo', async(req,res) => {
    let dbDungeon = await dungeonModel.find();
    if(dbDungeon.length !== 0){
        for(let i = 0; i < dbDungeon.length; i++){
            let dungeonInfo = await axios.get(`https://xivapi.com/InstanceContent/${dbDungeon[i].id}`);
            
            let filter = { id: dbDungeon[i].id, };
            let update = {
                description: dungeonInfo.data.Description,
                banner: `https://xivapi.com${dungeonInfo.data.Banner}`,
                patch: dungeonInfo.data.GamePatch.Version
            };

            await dungeonModel.findOneAndUpdate(filter, update);
        }
        let dbDungeon = await dungeonModel.find();
        res.json(dbDungeon);
    } else{
        res.json(dbDungeon);
    }
})

// Character POST
app.post('/api/character', async(req,res) => {
    let dbCharacter = await characterModel.findOne({ id: req.body.characterId });
    if(!dbCharacter){
        await queue.add(async() => {
            let response = await axios.get(`https://xivapi.com/character/${req.body.characterId}`, { params: { data: 'AC,FR,FC,MIMO,PVP', extended: 1 } });
            let fetchedCharacter = response.data;
            
            await characterModel.create({
                id: fetchedCharacter.Character.ID,
                name: fetchedCharacter.Character.Name,
                server: fetchedCharacter.Character.Description,
                dc: fetchedCharacter.Character.DC,
                avatar: fetchedCharacter.Character.Avatar,
                portrait: fetchedCharacter.Character.Portrait,
                freeCompany: fetchedCharacter.Character.FreeCompanyName,
                minions: fetchedCharacter.Minions,
                mounts: fetchedCharacter.Mounts,
                orchestrions: null,
                spells: null,
                cards: null,
            });

            let dbCharacter = await characterModel.findOne({ id: req.body.characterId });
            res.json(dbCharacter);
        });
        
    }else{
        res.json(dbCharacter);
    }
})

// Register
app.post('/api/signup', async(req,res) => {
    let dbUser = await userModel.findOne({ email: req.body.email });
    if(!dbUser){
        let accessToken = sha512('');
        await userModel.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            accessToken: accessToken,
        });
        res.json(dbUser);
    }else{
        res.json(false);
    }
})

// Log In
app.post('/api/signin', async(req,res) => {
    let dbUser = await userModel.findOne({ email: req.body.email });
    if(!dbUser){
        res.json(false);
    }else{
        let accessToken = sha512('');
        dbUser.accessToken = accessToken;
        await dbUser.save();
        res.json(dbUser);
    }
})

// Log In
app.post('/api/usercheck', async(req,res) => {
    let dbUser = await userModel.findOne({ accessToken: req.body.accessToken });
    if(!dbUser){
        res.json(false);
    }else{
        res.json(dbUser);
    }
})

app.listen(config.port, null, null, () =>
    console.log(`Running on port ${config.port}.`),
);