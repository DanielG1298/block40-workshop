import db from "#db/client";

export async function createTracks({ name, duration_ms }) {
  const sql = `
INSERT INTO tracks (track_name, duration_ms)
VALUES ($1, $2)
RETURNING id, track_name AS name, duration_ms`;
  const {rows: [tracks]} = await db.query(sql, [name, duration_ms]);
  return tracks;
}
export async function getTracks(){
  const sql = `
 SELECT
      id,
      track_name AS name,
      duration_ms
    FROM tracks
  `;
  const {rows: tracks} = await db.query(sql);
  return tracks
}
export async function getTrackById(id){
  const sql = `
 SELECT
      id,
      track_name AS name,
      duration_ms
    FROM tracks
    WHERE id = $1
  `;
  const {rows: [track]} = await db.query(sql,[id]);
  return track
}
export async function getTracksByPlaylistId(id){
  const sql = `
 SELECT
      tracks.id,
      tracks.track_name AS name,
      tracks.duration_ms
    FROM playlist_tracks
    JOIN tracks ON playlist_tracks.track_id = tracks.id
    WHERE playlist_tracks.playlist_id = $1
  `;
  const {rows: tracks} = await db.query(sql,[id]);
  return tracks
  
}