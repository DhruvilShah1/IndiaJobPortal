<?php

namespace App\Http\Controllers;


use App\Models\about;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function CreateAbout(Request $req){
        $data = $req->validate([
            'aboutText'=> 'required',
        ]);

                $about = about::updateOrCreate(
            ['user_id' => $req->user_id], 
            $data
        );

        
        return response()->json([
            'message' => 'About saved successfully',
            'about' => $about,
        ]);


    }

       public function getAbout($user_id)
{
    $about = about::where('user_id', $user_id)->first();

    if ($about) {
        return response()->json([
            'success' => true,
            'about' => $about
        ], 200); 
    }

    return response()->json([
        'success' => false,
        'error' => 'about not found'
    ], 404);
}


}
