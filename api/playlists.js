import express from "express";
const playlistsRouter =   express.Router();
export default playlistsRouter;

import { getPlaylists, getPlaylistById, createPlaylist } from "#queries/playlist";
import { getTracksByPlaylistId } from "#queries/tracks";
import { createPlayTracks } from "#queries/playlist_tracks";

playlistsRouter.get("/", async (req, res) =>{
    const playlists = await getPlaylists();
    res.send(playlists);
})
playlistsRouter.post("/", async (req, res) =>{
    if (!req.body) return res.status(400).send("missing request body");
    const { name, description } = req.body;
    if (!name || !description) return res.status(400).send("missing required fields");
    const playlist = await createPlaylist({ name, description});
    res.status(201).send(playlist);
})
playlistsRouter.param("id", async (req,res, next, id) =>{
    const playlist = await getPlaylistById(id);
    if (!playlist) return res.status(404).send("playlist not found");
    req.playlist = playlist;
    next();
})
playlistsRouter.get("/:id", async (req, res) =>{
    res.send(req.playlist);
})
playlistsRouter.get("/:id/tracks", async (req, res) =>{
    const tracks = await getTracksByPlaylistId(req.params.id);
    res.send(tracks);
})
playlistsRouter.post("/:id/tracks", async (req,res) =>{
    if (!req.body) return res.status(400).send("missing request body");
    const { trackId } = req.body;
    if (!trackId) return res.status(400).send("missing trackId in body");
    const playlistTrack = await createPlayTracks({ playlist_id: req.params.id, track_id: trackId });
    res.status(201).send(playlistTrack);

})