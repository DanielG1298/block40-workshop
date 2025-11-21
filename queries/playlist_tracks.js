import db from "#db/client";

export async function createPlayTracks({playlist_id, track_id}){
const sql = `
INSERT INTO playlist_tracks(playlist_id,track_id)
VALUES ($1,$2)
RETURNING *`;
const {rows: [playlist_tracks]} = await db.query(sql,[playlist_id, track_id])
return playlist_tracks;
} 

