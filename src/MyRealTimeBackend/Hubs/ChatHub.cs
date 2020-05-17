using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace MyRealTimeBackend.Hubs
{
    class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("MessageReceived", user, message);
        }

        public async Task SendCoords(int top, int left)
        {
            await Clients.All.SendAsync("CoordsReceived", top, left);
        }
    }
}