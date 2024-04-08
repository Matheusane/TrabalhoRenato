const API_BASE_URL = 'http://localhost:3001'

class EmprestimoService{


    async getAllEmprestimos(){
        try{
            const response = await fetch(`${API_BASE_URL}/emprestimo/`)
            if(!response.ok){
                throw new Error('Erro ao buscar Emprestimos')
            }
            const dados = await response.json()
            return dados


        }catch(error){
            console.error('Erro ao buscar emprestimos: ', error);
            throw error;
        }


    }

    async getEmprestimosByID(ID){
        try{
            const response = await fetch(`${API_BASE_URL}/emprestimo/${ID}`)
            if(!response.ok){
                throw new Error('Erro ao buscar Emprestimos')
            }
            const dados = await response.json()
            return dados


        }catch(error){
            console.error('Erro ao buscar emprestimos: ', error)
            throw error;
        }


    }

    async deleteEmprestimo(id){
        try{
            const response = await fetch(`${API_BASE_URL}/emprestimo/${id}`,{
                method:"DELETE",
            })
            if(!response.ok){
                throw new Error('Erro ao deletar emprestimo!')
            }

        }catch(error){
            console.error('Erro ao deletar emprestimo: ', error)
            throw error;
        }


    }

    async updateEmprestimo(ID,emprestimoData){
        try {
            const response = await fetch(`${API_BASE_URL}/emprestimo/${ID}`,{
                method:"PUT",
                headers:{
                    'content-type': 'application/json'
                },
                body:JSON.stringify(emprestimoData)

            })

            if(!response.ok){
                throw new Error('erro ao atualizar emprestimo')
            }

        } catch (error){
            throw error;
        }
    }


    async createEmprestimo(emprestimoData){
        try{
            const response = await fetch(`${API_BASE_URL}/emprestimo`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(emprestimoData)
            })
            if(!response.ok){
                throw new Error('Erro ao cadastrar emprestimo!')
            }

        }catch(error){
            throw error;
        }


    }

    async filtrar(filtroData) {
        try {
            const response = await fetch(`${API_BASE_URL}/emprestimo/filtrar`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filtroData)
            });
    
            if (!response.ok) {
                throw new Error(`Erro ao filtrar emprestimo! Status: ${response.status}, Mensagem: ${response.statusText}`);
            }
    
            return response.json();
        } catch (error) {
            throw error;
        }
    }
    


}
export default EmprestimoService