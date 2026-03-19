<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class about extends Model
{
    protected $table = 'abouts';

    protected $fillable = [
        'user_id' , 'aboutText' , 'skills'
    ];

    protected $casts = [
    'skills' => 'array',
];

    public $timestamps = false;

      public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
 
}
