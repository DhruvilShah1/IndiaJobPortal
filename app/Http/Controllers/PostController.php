<?php

namespace App\Http\Controllers;

use App\Models\post;
use Illuminate\Http\Request;

class PostController extends Controller
{
   public function store(Request $request)
{
    $request->validate([
        'postText' => 'nullable|string',
        'media[]' => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:10240', 
    ]);

    $mediaArray = [];

    if($request->hasFile('media')) {
        foreach($request->file('media') as $file) {
            $path = $file->store('posts', 'public'); 
            $type = strpos($file->getMimeType(), 'video') !== false ? 'video' : 'image';
            $mediaArray[] = [
                'type' => $type,
                'url' => $path
            ];
        }
    }

    $post = post::create([
        'user_id' => $request->user_id,
        'postText' => $request->postText,
        'media' => $mediaArray,
    ]);

    return response()->json($post);
}


public function get(Request $request, $postId){
     $limit = $request->get('postLimit', 2);

    $post = post::where('id', $postId)
                ->paginate($limit);

    return response()->json($post);
}


public function getParticularUserPosts(Request $request, $userId){

    $posts = post::where('user_id', $userId)->get();

    return response()->json($posts);
}

public function delete($postId){
    $post = post::where('id', $postId)->first();
  
    if(!$post) {
        return response()->json(['message' => 'Post not found'], 404);
    }

            $post->delete();

    return response()->json(['message' => 'Post deleted successfully']);    
}



}
