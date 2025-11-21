import db from "#db/client";
import { faker} from "@faker-js/faker";
import { createPlaylist } from "#queries/playlist";
import { createTracks } from "#queries/tracks";
import { createPlayTracks } from "#queries/playlist_tracks";
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed(){
  try{for (let i = 0; i < 10; i++) {
    
    const playlist = await createPlaylist({
      name: faker.music.genre(), 
      description: faker.lorem.sentence(),
    });

    
    
    for (let i = 0; i < 10; i++) {
      const track = await createTracks({
        name: `name ${i}`,
        duration_ms: i,
      });

      await createPlayTracks({
        playlist_id: playlist.id, 
        track_id: track.id,       
      });
    }
  }
}catch(error){
  console.log(error)
}
}


