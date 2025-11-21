import db from "#db/client";


export async function createPlaylist({ name, description }) {
  const sql = `
    INSERT INTO playlists (playlist_name, descriptions)
    VALUES ($1, $2)
    RETURNING
      id,
      playlist_name AS name,
      descriptions AS description
  `;
  const { rows: [playlist] } = await db.query(sql, [name, description]);
  return playlist;  
}


export async function getPlaylists() {
  const sql = `
    SELECT
      id,
      playlist_name AS name,
      descriptions AS description
    FROM playlists
  `;
  const { rows: playlists } = await db.query(sql);
  return playlists; 
}

export async function getPlaylistById(id) {
  const sql = `
    SELECT
      id,
      playlist_name AS name,
      descriptions AS description
    FROM playlists
    WHERE id = $1;
  `;
  const { rows: [playlist] } = await db.query(sql, [id]);
  return playlist;
}