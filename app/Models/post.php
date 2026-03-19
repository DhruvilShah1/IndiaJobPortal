<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class post extends Model
{
    protected $table = 'post';

        protected $fillable = ['user_id', 'postText', 'media'];

    protected $casts = [
        'media' => 'array',
    ];


}
