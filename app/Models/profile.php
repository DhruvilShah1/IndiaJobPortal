<?php

namespace App\Models;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class profile extends Model
{

protected $table = 'profile';
    protected  $fillable = [
        'user_id',
          'city',
  'Headline',
  'postcode',
  'pronouns',
  'location',
  'cover_image',
  'avatar',
  'show_experience'
    ];

public $timestamps = false;

   public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
