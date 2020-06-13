using System;

namespace DatingApp.API.Dtos
{
    public class MessageForCreationDto
    {
        public int SenderId { get; set; }
        public string SenderKnownAs { get; set; }
        public int RecipientId { get; set; }
        public string Content { get; set; }
        
        public DateTime MessageSent { get; set; }

        public MessageForCreationDto()
        {
            MessageSent = DateTime.Now;
        }
    }
}